import { Request, Response } from 'express';
import sql, { MAX } from 'mssql';
import axios  from 'axios';

import { getConnetionTokens } from '../database/connectionBDTokens';
import config from '../config';


export const saveToken = async (req : Request, res : Response) => {
    try {
        
        const { identifier, token } = req.body;

        const pool = await getConnetionTokens();
        
        const { rowsAffected } = await pool.request()
            .input('Identificador', sql.VarChar(MAX), identifier)
            .input('Token', sql.VarChar(300), token)
            .input('Usuario_Creacion', sql.Int, 0)    
            .execute('SP_Dispositivo_Agregar');

        pool.close();

        if( rowsAffected.length == 0){
            return res.status(400).json({
                ok : false,
                msg: 'Error in save token'
            });
        }

        return res.status(201).json({
            ok : true,
            identifier, token
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error on save token'
        });
    }
}

export const existIdentifier = async (req : Request, res : Response) => {
    try {
        
        const { identifier } = req.params;
        
        const pool = await getConnetionTokens();
        
        const { recordset } = await pool.request()
            .input('Identificador', sql.VarChar(400), identifier)
            .execute('SP_Dispositivo_ValidarToken');

        pool.close();

        if( recordset.length == 0){

            return res.status(200).json({
                ok : true,
                exists: false
            });

        } 

        return res.status(200).json({
            ok : true,
            exists: true
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error on save token'
        });
    }
}

export const getAllTokens = async (req : Request, res : Response) => {
    try {
        
        const tokens : string[] = await getTokens();

        if( tokens.length == 0 ){
            return res.status(404).json({
                ok: false,
                msg : 'Not found tokens'
            });
        }

        return res.status(200).json({
            ok: true,
            tokens
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error in get all tokens'
        });
    }
}

export const sendNotificationPush = async (req : Request, res: Response) => {
    try {
        
        const { idAirport, title, body } : { idAirport : string, title : string, body : string } = req.body;
        const url : string = 'https://fcm.googleapis.com/fcm/send';

        const tokens : string[] = await getTokensByIdAirport( idAirport );

        if(tokens.length == 0){
            return res.status(404).json({
                ok: false,
                msg: 'Not found tokens'
            });
        }

        const dataBody = {
            'notification' : {
                'title': title,
                'body' : body,
                'mutable_content': true,
                'sound': 'Tri-tone'
            },
            'priority': 'high',
            'data' : {
                'idAirport' : idAirport
            },
            'registration_ids' : tokens
        };

        const { data } = await axios.post(url, JSON.stringify(dataBody), {
            headers: {
                'Content-Type'  : 'application/json',
                'Authorization' : `key=${config.fmc_server_key}`
            },
        });

        const { success } = data;

        if(success == 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Error no send notifications'
            });
        }

        return res.status(200).json({
            ok: true,
            msg: 'Send notifications'
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok : false,
            msg: 'Error in send notification push'
        });
    }
}

const getTokens = async () : Promise<string[]>  => {

    try {
        
        const pool = await getConnetionTokens();
        
        const { recordset } = await pool.request().execute('SP_Dispositivo_Ver0');

        pool.close();

        if( recordset.length == 0 ){
            return [] as string[];
        }

        const tokens:string[] = new Array();

        recordset.forEach(item => {
            tokens.push( item.Token );
        });

        return tokens;

    } catch (err) {
        console.error(err);
        throw new Error('Error in getTokens');
    }
}

const getTokensByIdAirport = async (idAirport : string) : Promise<string[]> => {
    
    try {
        
        const pool = await getConnetionTokens();
        
        const { recordset } = await pool.request()
            .input('ID_Aeropuerto', sql.Int, idAirport)
            .execute('SP_Dispositivo_VerFavoritos_por_token');

        pool.close();

        if( recordset.length == 0 ){
            return [] as string[];
        }

        const tokens:string[] = new Array();

        recordset.forEach(item => {
            tokens.push( item.Token );
        });

        return tokens;

    } catch (err) {
        console.error(err);
        throw new Error('Error in getTokens');
    }

}