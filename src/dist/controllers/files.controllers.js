"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentosById = exports.getAllFiles = void 0;
const connection_1 = require("../database/connection");
const mssql_1 = __importDefault(require("mssql"));
const getAllFiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield (0, connection_1.getConnetion)();
        const { recordset } = yield pool.request().execute('SP_TB_Documentos_Ver');
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
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error'
        });
    }
});
exports.getAllFiles = getAllFiles;
const getDocumentosById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const pool = yield (0, connection_1.getConnetion)();
        const { recordset: data } = yield pool.request()
            .input('ID_Aeropuerto', mssql_1.default.Int, id)
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
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error, while retrieving a document by ID.'
        });
    }
});
exports.getDocumentosById = getDocumentosById;
//# sourceMappingURL=files.controllers.js.map