import { Request, Response } from 'express';

import { getConnetion } from '../database/connection';
import { getConnetionTokens } from '../database/connectionBDTokens';
import sql, { MAX } from 'mssql';


export const getFavoritebyIdentificador = async (req: Request, res: Response) => {

    try {

        const { Identificador } = req.params;

        const pool = await getConnetionTokens();

        const { recordset } = await pool.request()
            .input('Identificador', sql.VarChar(450), Identificador)
            .execute('SP_AEFavoritos_Ver_por_Identificador');

        pool.close();

        if (recordset.length === 0) {

            return res.status(404).json({
                ok: false,
                length: 0,
                msg: 'There are no id airports'
            });
        }

        return res.status(200).json({
            ok: true,
            Recuperados: recordset
        });

    } catch (err){
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error in get id airport'
        })
    }

}

export const getValidateExist = async (req: Request, res: Response) => {

     try {

         const { ID_Aeropuerto, Identificador, } = req.params;

         const pool = await getConnetionTokens();

        const { recordset } = await pool.request()
            .input('ID_Aeropuerto', sql.Int, ID_Aeropuerto)
            .input('Identificador', sql.VarChar(450), Identificador)
            .execute('SP_AEFavoritos_Ver');

         pool.close();

        if (recordset.length === 0) {

            return res.status(404).json({
                ok: false,
                msg: 'Error search '+ ID_Aeropuerto + Identificador
             });
         }

        return res.status(200).json({
            ok: true,
            msg: 'Ok'
        });

    } catch (err){
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error in get favorite'
        })
    }

}

export const postFavoriteAirports = async (req: Request, res: Response) => {

    try {

         //variables
        let { 
            ID_Aeropuerto,
            Identificador,
            Nombre,
            Nombre_OACI,
            NombreICAO,
            Usuario_Creacion,
        } = req.body;

        const pool = await getConnetionTokens();

        const { recordset } = await pool
            .request()
            .input("ID_Aeropuerto", sql.Int, ID_Aeropuerto)
            .input("Identificador", sql.VarChar(200), Identificador)
            .input("Nombre", sql.VarChar(200), Nombre)
            .input("Nombre_OACI", sql.VarChar(5), Nombre_OACI)
            .input("NombreICAO", sql.VarChar(25), NombreICAO)
            .input("Usuario_Creacion", sql.Int, Usuario_Creacion)
            .execute('SP_AEFavoritos_Agregar');

        pool.close();

        if (recordset === undefined) {
            return res.status(404).json
                ({
                    ok: false,
                    msg: 'Error insert a Favorite'
                });
        }
        return res.status(200).json
            ({
                ok: true,
                msg: 'Ok'
            });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: "Request Error, cant create a Favorite",
        });
    }
}

export const deleteFavoriteAirports = async (req: Request, res: Response) => {

    const { ID_Aeropuerto, Identificador } = req.params;// required parameter IDAeropuerto

    try {

        const pool = await getConnetionTokens();

        const { recordset } = await pool
            .request()
            .input("ID_Aeropuerto", sql.Int, ID_Aeropuerto)
            .input("Identificador", sql.VarChar(200), Identificador)
            .execute('SP_AEFavoritos_Eliminar');

        pool.close();

        if (recordset === undefined) {
            return res.status(404).json
                ({
                    ok: false,
                    msg: 'Error delete a Airport'
                });
        }
        return res.status(200).json
            ({
                ok: true,
                msg: 'Ok'
            });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: "Request Error, cant delete a Favorite Airport",
        });
    }
}

export const getAllAirports = async (req: Request, res: Response) => {

    try {

        const pool = await getConnetion();

        const { recordset } = await pool.request().execute('SP_Aeropuerto_MostrarRelevantes');

        pool.close();

        if (recordset.length === 0) {

            return res.status(404).json({
                ok: false,
                length: 0,
                msg: 'There are no airports'
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
            msg: 'Error on get all airports'
        });
    }
}

export const getLengthAirports = async (req: Request, res: Response) => {

    try {

        const pool = await getConnetion();

        const { recordset } = await pool.request().execute('SP_Aeropuerto_Mostrar_Cantidad');

        pool.close();

        if (recordset.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'Not founds aiports'
            });
        }

        const { Numero_aeropuertos } = recordset[0];

        return res.status(200).json({
            ok: true,
            size: Numero_aeropuertos
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error on get size airports'
        });
    }
}

export const getIsUpdateAirport = async (req: Request, res: Response) => {

    try {
        let isUpdate: Boolean = false;

        const { id } = req.params;
        const { lastDate }: { lastDate: string } = req.body;

        const pool = await getConnetion();

        const { recordset } = await pool.request()
            .input('ID_Aeropuerto', sql.Int, id)
            .execute('SP_Aeropuerto_Mostra_UltimaAcualizacion');

        pool.close();

        if (recordset.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'Not found aiport'
            });
        }

        const { Ultima_Actualizacion }: { Ultima_Actualizacion: string } = recordset[0];

        const date = new Date(lastDate);
        const dateDB = new Date(Ultima_Actualizacion);

        if (date < dateDB) {
            isUpdate = true;
        }

        return res.status(200).json({
            ok: true,
            update: isUpdate
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error get last date airport'
        });
    }
}

export const getAllAirportByName = async (req: Request, res: Response) => {

    try {

        const { name } = req.params;
        const pool = await getConnetion();

        const { recordset } = await pool.request()
            .input('Nombre', sql.VarChar(200), name)
            .execute('SP_Aeropuerto_Buscador');

        pool.close();

        if (recordset === undefined) {

            return res.status(404).json({
                ok: false,
                msg: 'There are no airports with name ' + name
            });
        }

        return res.status(200).json({
            ok: true,
            length: recordset.length,
            airports: recordset
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error on get an airports'
        });
    }
}

export const getAnAirportById = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        const pool = await getConnetion();

        const { recordset: data } = await pool.request()
            .input('ID_Aeropuerto', sql.Int, id)
            .execute('SP_Aeropuerto_Mostrar_4');

        const { recordset: frequencies } = await pool.request()
            .input('ID_Aeropuerto', sql.Int, id)
            .execute('SP_Frecuencia_Mostrar_por_ID');

        const { recordset: notams } = await pool.request()
            .input('ID_Aeropuerto', sql.Int, id)
            .execute('SP_Notams_Mostrar_por_ID');

        pool.close();

        if (data.length === 0) {

            return res.status(404).json({
                ok: false,
                msg: 'There are no airport with id ' + id
            });
        }

        const { ID_Aeropuerto, Nombre, Nombre_OACI, NombreICAO, Estado_Aeropuerto, Ultima_Actualizacion } = data[0];

        const airport = {
            ID_Aeropuerto,
            Nombre,
            Nombre_OACI,
            NombreICAO,
            Estado_Aeropuerto,
            Ultima_Actualizacion
        };

        const {
            ID_CarESP_Aero,
            Publico,
            Controlado,
            Coordenada,
            Info_Torre,
            Info_General,
            Espacio_Aereo,
            Combustible,
            Norma_General,
            Norma_Particular
        } = data[0];

        const features = {
            ID_CarESP_Aero,
            ID_Aeropuerto,
            Publico,
            Controlado,
            Coordenada,
            Info_Torre,
            Info_General,
            Espacio_Aereo,
            Combustible,
            Norma_General,
            Norma_Particular
        };

        const {
            ID_Pista,
            Pista,
            Elevacion,
            Superficie_Pista,
            ASDA_Rwy_1,
            ASDA_Rwy_2,
            TODA_Rwy_1,
            TODA_Rwy_2,
            TORA_Rwy_1,
            TORA_Rwy_2,
            LDA_Rwy_1,
            LDA_Rwy_2
        } = data[0];

        const runways = {
            ID_Pista,
            ID_Aeropuerto,
            Pista,
            Elevacion,
            Superficie_Pista,
            ASDA_Rwy_1,
            ASDA_Rwy_2,
            TODA_Rwy_1,
            TODA_Rwy_2,
            TORA_Rwy_1,
            TORA_Rwy_2,
            LDA_Rwy_1,
            LDA_Rwy_2
        };

        const {
            ID_Contacto,
            Direccion_Exacta,
            Numero_Telefono1,
            Numero_Telefono2,
            Horario,
        } = data[0];

        const contact = {
            ID_Contacto,
            ID_Aeropuerto,
            Direccion_Exacta,
            Numero_Telefono1,
            Numero_Telefono2,
            Horario
        };

        return res.status(200).json({
            ok: true,
            Aeropuerto: airport,
            Caracteristicas_Especiales: features,
            Frecuencias: frequencies,
            NOTAMS: notams,
            Pistas: runways,
            Contacto: contact
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error in get an airport by id'
        })
    }
}

export const getAirportBySearch = async (req: Request, res: Response) => {

    try {

        const { name } = req.params;
        const pool = await getConnetion();

        const { recordset } = await pool.request()
            .input('Nombre', sql.VarChar(200), name)
            .execute('SP_Aeropuerto_Buscador');

        pool.close();

        if (recordset === undefined) {

            return res.status(404).json({
                ok: false,
                msg: 'There are no airports you are looking for' + name
            });
        }

        return res.status(200).json({
            ok: true,
            length: recordset.length,
            airports: recordset
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error on find some airports'
        });
    }
}
// Code by RK
export const putAnAirport = async (req: Request, res: Response) => {
    try {
        const { Ejecutables } = req.params; //executable SP_Orquestador required parameter Ejecutables (varchar)
        const { IDAeropuerto } = req.params;// required parameter IDAeropuerto
        let {  //variables
            Usario,
            Nombre_OACI,
            NombreICAO,
            Estado_Aeropuerto,
            Notam,
            Publico,
            Controlado,
            Coordenada,
            Info_Torre,
            Info_General,
            Espacio_Aereo,
            Combustible,
            Norma_General,
            Norma_Particular,
            Direccion_Exacta,
            Numero_Telefono1,
            Numero_Telefono2,
            Horario,
            ATIS,
            GRND,
            TWR,
            EMERGENCY,
            Otras,
            Pista,
            Elevacion,
            Superficie_Pista,
            ASDA_Rwy_1,
            ASDA_Rwy_2,
            TODA_Rwy_1,
            TODA_Rwy_2,
            TORA_Rwy_1,
            TORA_Rwy_2,
            LDA_Rwy_1,
            LDA_Rwy_2,
        } = req.body;

        const pool = await getConnetion(); //getting connection

        const { recordset } = await pool //send all input parameters to SP_Orquestador
            .request()
            .input("Ejecutables", sql.VarChar(20), Ejecutables)
            .input("IDAeropuerto", sql.Int, IDAeropuerto)
            .input("Nombre_OACI", sql.VarChar(30), Nombre_OACI)
            .input("NombreICAO", sql.VarChar(30), NombreICAO)
            .input("Usario", sql.Int, Usario)
            .input("Estado_Aeropuerto", sql.VarChar(30), Estado_Aeropuerto)
            .input("Notam", sql.VarChar(MAX), Notam)
            .input("Publico", sql.Int, Publico)
            .input("Controlado", sql.Int, Controlado)
            .input("Coordenada", sql.VarChar(100), Coordenada)
            .input("Info_Torre", sql.VarChar(300), Info_Torre)
            .input("Info_General", sql.VarChar(MAX), Info_General)
            .input("Espacio_Aereo", sql.VarChar(20), Espacio_Aereo)
            .input("Combustible", sql.VarChar(50), Combustible)
            .input("Norma_General", sql.VarChar(MAX), Norma_General)
            .input("Norma_Particular", sql.VarChar(500), Norma_Particular)
            .input("Direccion_Exacta", sql.VarChar(200), Direccion_Exacta)
            .input("Numero_Telefono1", sql.VarChar(50), Numero_Telefono1)
            .input("Numero_Telefono2", sql.VarChar(50), Numero_Telefono2)
            .input("Horario", sql.VarChar(100), Horario)
            .input("ATIS", sql.VarChar(20), ATIS)
            .input("GRND", sql.VarChar(20), GRND)
            .input("TWR", sql.VarChar(20), TWR)
            .input("EMERGENCY", sql.VarChar(20), EMERGENCY)
            .input("Otras", sql.VarChar(20), Otras)
            .input("Pista", sql.VarChar(50), Pista)
            .input("Elevacion", sql.VarChar(100), Elevacion)
            .input("Superficie_Pista", sql.VarChar(50), Superficie_Pista)
            .input("ASDA_Rwy_1", sql.Int, ASDA_Rwy_1)
            .input("ASDA_Rwy_2", sql.Int, ASDA_Rwy_2)
            .input("TODA_Rwy_1", sql.Int, TODA_Rwy_1)
            .input("TODA_Rwy_2", sql.Int, TODA_Rwy_2)
            .input("TORA_Rwy_1", sql.Int, TORA_Rwy_1)
            .input("TORA_Rwy_2", sql.Int, TORA_Rwy_2)
            .input("LDA_Rwy_1", sql.Int, LDA_Rwy_1)
            .input("LDA_Rwy_2", sql.Int, LDA_Rwy_2)
            .execute("SP_Orquestador");
        pool.close();

        if (recordset === undefined) {
            return res.status(404).json({
                ok: false,
                length: 0,
                msg: "Error updating an Airport",
            });
        }

        return res.status(200).json({
            ok: true,
            msg: recordset,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: "Request Error, cant update an Airport",
        });
    }
};
