import { Request, Response } from 'express';

import { getConnetion } from '../database/connection';
import sql, { MAX } from 'mssql';

export const GetAirportFile = async (req : Request, res : Response) => {
    
    try {
        const { name } = req.params;
        const file ='src/access/files/MROC.pdf';
        if (!name)
        {
            res.status(400).json
            ({
                ok:false,
                message: 'Error on find airport'
            });
        }
        else
        {
            const pool = await getConnetion();
            const { recordset: data} = await pool.request()
                .input('Nombre', sql.VarChar(200), name)
                .execute('SP_Aeropuerto_Buscador');
    
            pool.close();
            const { ID_Aeropuerto, Nombre, Nombre_OACI, NombreICAO} = data[0];
    
            const airport = 
            {
                ID_Aeropuerto,
                Nombre,
                Nombre_OACI,
                NombreICAO
            };
            if(ID_Aeropuerto==23)
            {
                if(data === undefined) 
                {
    
                    return res.status(404).json
                    ({
                        ok: false,
                        msg: 'There are no airports you are looking for' + name
                    });    
                }
                return res.status(200).json({
                    ok: true,
                    airports: airport,
                    file: file
                }); 
            }
            else if(ID_Aeropuerto!=23)
            {
                if(data === undefined) 
                {

                    return res.status(404).json({
                        ok: false,
                        msg: 'There are no airports you are looking for' + name
                    });    
                }
                return res.status(200).json({
                    ok: false,
                    airports: airport,
                    msg: 'You do not have file'
                }); 
            }
            else
            {
                return res.status(404).json
                ({
                    ok: false,
                    msg: 'There are no airports you are looking for' + name
                });  
            }
        } 
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error on find some airports'
        });
    }
}

