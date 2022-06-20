import { json, Request, Response } from 'express';

import { getConnetion } from '../database/connection';
import sql from 'mssql';

var jwt =require('jsonwebtoken');
var express = require('express');


export const postAutenticationLogin =async (req: Request, res: Response) =>
{
    //validations 
    try
    {
        //cont var to login
        const cedula = req.params.cedula;
        const password = req.params.password;
        
        //if id and passwor equals 0 
        if(!cedula || !password  )
        {
            res.status(400).json
            ({
                ok:false,
                message: 'Please enter username and password'
            });
        }
        else
        {
            //get connection
            const pool = await getConnetion();
            const { recordset: users} = await pool.request()
                .input('Cedula', sql.VarChar(50), cedula)
                .input('Contraseña', sql.VarChar(50), password)
                .execute('SP_Usuario_Inicio_de_sesion');
            pool.close();
            // var to get ID_airport
            const {Cedula,ID_Aeropuerto} = users[0];
            const user={Cedula,ID_Aeropuerto}
            if(users.length === 0)
            {
                return res.status(404).json
                ({
                    ok: false,
                    msg: 'You are not logged' + cedula
                });    
            }
            return res.status(200).json
            ({
                ok      : true,
                cedula  : cedula,
                airport : user
                //token: token
            });
        } 
    }
    catch (err)
    {
        console.log(err);
        return res.status(500).json
        ({
            ok: false,
            msg: 'Error while trying to log in',error: err
        });
    }
}

export const getUsersInfo = async (req: Request, res: Response) => {

    try {

        const pool = await getConnetion();

        const { recordset } = await pool.request().execute('SP_ListarUsuario');

        pool.close();

        if (recordset.length === 0) {

            return res.status(404).json({
                ok: false,
                length: 0,
                msg: 'There are no users information'
            });
        }

        return res.status(200).json({
            ok: true,
            length: recordset.length,
            airports: recordset
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error on get users information'
        });
    }
}