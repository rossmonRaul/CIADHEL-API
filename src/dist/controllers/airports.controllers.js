"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
        for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }
    return new(P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }

        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }

        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putAnAirport = exports.getAirportBySearch = exports.getAnAirportById = exports.getAllAirportByName = exports.getIsUpdateAirport = exports.getLengthAirports = exports.getAllAirports = exports.deleteFavoriteAirports = exports.postFavoriteAirports = exports.getValidateExist = exports.getFavoritebyIdentificador = void 0;
const connection_1 = require("../database/connection");
const connectionBDTokens_1 = require("../database/connectionBDTokens");
const mssql_1 = __importStar(require("mssql"));
const puppeteer = require('puppeteer');
const { json } = require("express");
const getFavoritebyIdentificador = (req, res) => __awaiter(void 0, void 0, void 0, function*() {
    try {
        const { Identificador } = req.params;
        const pool = yield(0, connectionBDTokens_1.getConnetionTokens)();
        const { recordset } = yield pool.request()
            .input('Identificador', mssql_1.default.VarChar(450), Identificador)
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
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error in get id airport'
        });
    }
});
exports.getFavoritebyIdentificador = getFavoritebyIdentificador;
const getValidateExist = (req, res) => __awaiter(void 0, void 0, void 0, function*() {
    try {
        const { ID_Aeropuerto, Identificador, } = req.params;
        const pool = yield(0, connectionBDTokens_1.getConnetionTokens)();
        const { recordset } = yield pool.request()
            .input('ID_Aeropuerto', mssql_1.default.Int, ID_Aeropuerto)
            .input('Identificador', mssql_1.default.VarChar(450), Identificador)
            .execute('SP_AEFavoritos_Ver');
        pool.close();
        if (recordset.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'Error search ' + ID_Aeropuerto + Identificador
            });
        }
        return res.status(200).json({
            ok: true,
            msg: 'Ok'
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error in get favorite'
        });
    }
});
exports.getValidateExist = getValidateExist;
const postFavoriteAirports = (req, res) => __awaiter(void 0, void 0, void 0, function*() {
    try {
        //variables
        let { ID_Aeropuerto, Identificador, Nombre, Nombre_OACI, NombreICAO, Usuario_Creacion, } = req.body;
        const pool = yield(0, connectionBDTokens_1.getConnetionTokens)();
        const { recordset } = yield pool
            .request()
            .input("ID_Aeropuerto", mssql_1.default.Int, ID_Aeropuerto)
            .input("Identificador", mssql_1.default.VarChar(200), Identificador)
            .input("Nombre", mssql_1.default.VarChar(200), Nombre)
            .input("Nombre_OACI", mssql_1.default.VarChar(5), Nombre_OACI)
            .input("NombreICAO", mssql_1.default.VarChar(25), NombreICAO)
            .input("Usuario_Creacion", mssql_1.default.Int, Usuario_Creacion)
            .execute('SP_AEFavoritos_Agregar');
        pool.close();
        if (recordset === undefined) {
            return res.status(404).json({
                ok: false,
                msg: 'Error insert a Favorite'
            });
        }
        return res.status(201).json({
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
});
exports.postFavoriteAirports = postFavoriteAirports;
const deleteFavoriteAirports = (req, res) => __awaiter(void 0, void 0, void 0, function*() {
    const { ID_Aeropuerto, Identificador } = req.params; // required parameter IDAeropuerto
    try {
        const pool = yield(0, connectionBDTokens_1.getConnetionTokens)();
        const { recordset } = yield pool
            .request()
            .input("ID_Aeropuerto", mssql_1.default.Int, ID_Aeropuerto)
            .input("Identificador", mssql_1.default.VarChar(200), Identificador)
            .execute('SP_AEFavoritos_Eliminar');
        pool.close();
        if (recordset === undefined) {
            return res.status(404).json({
                ok: false,
                msg: 'Error delete a Airport'
            });
        }
        return res.status(200).json({
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
});
exports.deleteFavoriteAirports = deleteFavoriteAirports;
const getAllAirports = (req, res) => __awaiter(void 0, void 0, void 0, function*() {
    try {
        const pool = yield(0, connection_1.getConnetion)();
        const { recordset } = yield pool.request().execute('SP_Aeropuerto_MostrarRelevantes');
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
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error on get all airports'
        });
    }
});
exports.getAllAirports = getAllAirports;
const getLengthAirports = (req, res) => __awaiter(void 0, void 0, void 0, function*() {
    try {
        const pool = yield(0, connection_1.getConnetion)();
        const { recordset } = yield pool.request().execute('SP_Aeropuerto_Mostrar_Cantidad');
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
});
exports.getLengthAirports = getLengthAirports;
const getIsUpdateAirport = (req, res) => __awaiter(void 0, void 0, void 0, function*() {
    try {
        let isUpdate = false;
        const { id } = req.params;
        const { lastDate } = req.body;
        const pool = yield(0, connection_1.getConnetion)();
        const { recordset } = yield pool.request()
            .input('ID_Aeropuerto', mssql_1.default.Int, id)
            .execute('SP_Aeropuerto_Mostra_UltimaAcualizacion');
        pool.close();
        if (recordset.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'Not found aiport'
            });
        }
        const { Ultima_Actualizacion } = recordset[0];
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
});
exports.getIsUpdateAirport = getIsUpdateAirport;
const getAllAirportByName = (req, res) => __awaiter(void 0, void 0, void 0, function*() {
    try {
        const { name } = req.params;
        const pool = yield(0, connection_1.getConnetion)();
        const { recordset } = yield pool.request()
            .input('Nombre', mssql_1.default.VarChar(200), name)
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
});
exports.getAllAirportByName = getAllAirportByName;
const getAnAirportById = (req, res) => __awaiter(void 0, void 0, void 0, function*() {
    try {
        const { id } = req.params;
        const pool = yield(0, connection_1.getConnetion)();
        const { recordset: data } = yield pool.request()
            .input('ID_Aeropuerto', mssql_1.default.Int, id)
            .execute('SP_Aeropuerto_Mostrar_4');
        const { recordset: frequencies } = yield pool.request()
            .input('ID_Aeropuerto', mssql_1.default.Int, id)
            .execute('SP_Frecuencia_Mostrar_por_ID');
        const { recordset: notams } = yield pool.request()
            .input('ID_Aeropuerto', mssql_1.default.Int, id)
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
        const { ID_CarESP_Aero, Publico, Controlado, Coordenada, Info_Torre, Info_General, Espacio_Aereo, Combustible, Norma_General, Norma_Particular } = data[0];
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
        const { ID_Pista, Pista, Elevacion, Superficie_Pista, ASDA_Rwy_1, ASDA_Rwy_2, TODA_Rwy_1, TODA_Rwy_2, TORA_Rwy_1, TORA_Rwy_2, LDA_Rwy_1, LDA_Rwy_2 } = data[0];
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
        const { ID_Contacto, Direccion_Exacta, Numero_Telefono1, Numero_Telefono2, Horario, } = data[0];
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
        });
    }
});
exports.getAnAirportById = getAnAirportById;
const getAirportBySearch = (req, res) => __awaiter(void 0, void 0, void 0, function*() {
    try {
        const { name } = req.params;
        const pool = yield(0, connection_1.getConnetion)();
        const { recordset } = yield pool.request()
            .input('Nombre', mssql_1.default.VarChar(200), name)
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
});
exports.getAirportBySearch = getAirportBySearch;
// Code by RK
const putAnAirport = (req, res) => __awaiter(void 0, void 0, void 0, function*() {
    try {
        const { Ejecutables } = req.params; //executable SP_Orquestador required parameter Ejecutables (varchar)
        const { IDAeropuerto } = req.params; // required parameter IDAeropuerto
        let { //variables
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
        const pool = yield(0, connection_1.getConnetion)(); //getting connection
        const { recordset } = yield pool //send all input parameters to SP_Orquestador
            .request()
            .input("Ejecutables", mssql_1.default.VarChar(20), Ejecutables)
            .input("IDAeropuerto", mssql_1.default.Int, IDAeropuerto)
            .input("Nombre_OACI", mssql_1.default.VarChar(30), Nombre_OACI)
            .input("NombreICAO", mssql_1.default.VarChar(30), NombreICAO)
            .input("Usario", mssql_1.default.Int, Usario)
            .input("Estado_Aeropuerto", mssql_1.default.VarChar(30), Estado_Aeropuerto)
            .input("Notam", mssql_1.default.VarChar(mssql_1.MAX), Notam)
            .input("Publico", mssql_1.default.Int, Publico)
            .input("Controlado", mssql_1.default.Int, Controlado)
            .input("Coordenada", mssql_1.default.VarChar(100), Coordenada)
            .input("Info_Torre", mssql_1.default.VarChar(300), Info_Torre)
            .input("Info_General", mssql_1.default.VarChar(mssql_1.MAX), Info_General)
            .input("Espacio_Aereo", mssql_1.default.VarChar(20), Espacio_Aereo)
            .input("Combustible", mssql_1.default.VarChar(50), Combustible)
            .input("Norma_General", mssql_1.default.VarChar(mssql_1.MAX), Norma_General)
            .input("Norma_Particular", mssql_1.default.VarChar(500), Norma_Particular)
            .input("Direccion_Exacta", mssql_1.default.VarChar(200), Direccion_Exacta)
            .input("Numero_Telefono1", mssql_1.default.VarChar(50), Numero_Telefono1)
            .input("Numero_Telefono2", mssql_1.default.VarChar(50), Numero_Telefono2)
            .input("Horario", mssql_1.default.VarChar(100), Horario)
            .input("ATIS", mssql_1.default.VarChar(20), ATIS)
            .input("GRND", mssql_1.default.VarChar(20), GRND)
            .input("TWR", mssql_1.default.VarChar(20), TWR)
            .input("EMERGENCY", mssql_1.default.VarChar(20), EMERGENCY)
            .input("Otras", mssql_1.default.VarChar(20), Otras)
            .input("Pista", mssql_1.default.VarChar(50), Pista)
            .input("Elevacion", mssql_1.default.VarChar(100), Elevacion)
            .input("Superficie_Pista", mssql_1.default.VarChar(50), Superficie_Pista)
            .input("ASDA_Rwy_1", mssql_1.default.Int, ASDA_Rwy_1)
            .input("ASDA_Rwy_2", mssql_1.default.Int, ASDA_Rwy_2)
            .input("TODA_Rwy_1", mssql_1.default.Int, TODA_Rwy_1)
            .input("TODA_Rwy_2", mssql_1.default.Int, TODA_Rwy_2)
            .input("TORA_Rwy_1", mssql_1.default.Int, TORA_Rwy_1)
            .input("TORA_Rwy_2", mssql_1.default.Int, TORA_Rwy_2)
            .input("LDA_Rwy_1", mssql_1.default.Int, LDA_Rwy_1)
            .input("LDA_Rwy_2", mssql_1.default.Int, LDA_Rwy_2)
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
});
exports.putAnAirport = putAnAirport;
const getMeteorologywithScraping = async(req, res) => {
    try {
        const { nombre } = req.params;

        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        const page2 = await browser.newPage();

        await page.goto(`https://metar-taf.com/es/metar-view/${nombre}`);
        await page2.goto(`https://metar-taf.com/es/taf/${nombre}`)

        const meteorology = {};

        const metar = await page.evaluate(() => {

            const tmp = document.querySelector('#metar code').innerText;
            // tmp.author = document.querySelector('.author a').innerText;
            return tmp;
        })
        meteorology.metar = metar;

        const taf = await page2.evaluate(() => {
            // const tmp = {};
            const tmp = document.querySelector('#taf code').innerText;
            // tmp.author = document.querySelector('.author a').innerText;
            return tmp;
        })
        meteorology.taf = taf;
        await browser.close();

        if (meteorology === undefined) {
            return res.status(404).json({
                ok: false,
                msg: 'There are no airports meteorology info '
            });
        }
        return res.status(200).json({
            ok: true,
            airports: meteorology
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error on get an airports'
        });
    }
};
exports.getMeteorologywithScraping = getMeteorologywithScraping;
//# sourceMappingURL=airports.controllers.js.map