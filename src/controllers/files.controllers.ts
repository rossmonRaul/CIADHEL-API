import { Request, Response } from 'express';
import { getConnetion } from '../database/connection';
import sql, { MAX } from 'mssql';


export const getAllFiles = async (req: Request, res: Response) => {
    try {
        const pool = await getConnetion();
        const { recordset } = await pool.request().execute('SP_TB_Documentos_Ver');
        pool.close();

        if (recordset.length === 0) {
            return res.status(404).json({
                ok: false,
                length: 0,
                msg: 'Error'
            });
        }
        return res.status(200).json({
            ok: true,
            length: recordset.length,
            documentos: recordset

        });
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            ok: false,
            msg: 'Error'
        });

    }
}

export const getDocumentosById = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        const pool = await getConnetion();

        const { recordset: data } = await pool.request()
            .input('ID_Aeropuerto', sql.Int, id)
            .execute('SP_TB_Documentos_Ver_por_ID');
        pool.close();

        if (data.length === 0) {

            return res.status(404).json({
                ok: false,
                msg: 'The document with the ID ' + id + ' does not exist. '
            });
        }

        const { ID_Aeropuerto, Nombre, Extension, Contenido } = data[0];
        const contenidoBase64 = Buffer.from(Contenido).toString('base64');

        const documento_pdf = {
            ID_Aeropuerto,
            Nombre,
            Extension,
            Contenido: contenidoBase64

        };
        return res.status(200).json({
            ok: true,
            Documentos_pdf: documento_pdf,

        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error, while retrieving a document by ID.'
        })
    }
}

