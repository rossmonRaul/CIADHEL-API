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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.sendNotificationPush = exports.getAllTokens = exports.existIdentifier = exports.saveToken = void 0;
const mssql_1 = __importStar(require("mssql"));
const axios_1 = __importDefault(require("axios"));
const connectionBDTokens_1 = require("../database/connectionBDTokens");
const config_1 = __importDefault(require("../config"));
const saveToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { identifier, token } = req.body;
        const pool = yield (0, connectionBDTokens_1.getConnetionTokens)();
        const { rowsAffected } = yield pool.request()
            .input('Identificador', mssql_1.default.VarChar(mssql_1.MAX), identifier)
            .input('Token', mssql_1.default.VarChar(300), token)
            .input('Usuario_Creacion', mssql_1.default.Int, 0)
            .execute('SP_Dispositivo_Agregar');
        pool.close();
        if (rowsAffected.length == 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Error in save token'
            });
        }
        return res.status(201).json({
            ok: true,
            identifier, token
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error on save token'
        });
    }
});
exports.saveToken = saveToken;
const existIdentifier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { identifier } = req.params;
        const pool = yield (0, connectionBDTokens_1.getConnetionTokens)();
        const { recordset } = yield pool.request()
            .input('Identificador', mssql_1.default.VarChar(400), identifier)
            .execute('SP_Dispositivo_ValidarToken');
        pool.close();
        if (recordset.length == 0) {
            return res.status(200).json({
                ok: true,
                exists: false
            });
        }
        return res.status(200).json({
            ok: true,
            exists: true
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error on save token'
        });
    }
});
exports.existIdentifier = existIdentifier;
const getAllTokens = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokens = yield getTokens();
        if (tokens.length == 0) {
            return res.status(404).json({
                ok: false,
                msg: 'Not found tokens'
            });
        }
        return res.status(200).json({
            ok: true,
            tokens
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error in get all tokens'
        });
    }
});
exports.getAllTokens = getAllTokens;
const sendNotificationPush = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idAirport, title, body } = req.body;
        const url = 'https://fcm.googleapis.com/fcm/send';
        const tokens = yield getTokensByIdAirport(idAirport);
        if (tokens.length == 0) {
            return res.status(404).json({
                ok: false,
                msg: 'Not found tokens'
            });
        }
        const dataBody = {
            'notification': {
                'title': title,
                'body': body,
                'mutable_content': true,
                'sound': 'Tri-tone'
            },
            'priority': 'high',
            'data': {
                'idAirport': idAirport
            },
            'registration_ids': tokens
        };
        const { data } = yield axios_1.default.post(url, JSON.stringify(dataBody), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `key=${config_1.default.fmc_server_key}`
            },
        });
        const { success } = data;
        if (success == 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Error no send notifications'
            });
        }
        return res.status(200).json({
            ok: true,
            msg: 'Send notifications'
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error in send notification push'
        });
    }
});
exports.sendNotificationPush = sendNotificationPush;
const getTokens = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield (0, connectionBDTokens_1.getConnetionTokens)();
        const { recordset } = yield pool.request().execute('SP_Dispositivo_Ver0');
        pool.close();
        if (recordset.length == 0) {
            return [];
        }
        const tokens = new Array();
        recordset.forEach(item => {
            tokens.push(item.Token);
        });
        return tokens;
    }
    catch (err) {
        console.error(err);
        throw new Error('Error in getTokens');
    }
});
const getTokensByIdAirport = (idAirport) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield (0, connectionBDTokens_1.getConnetionTokens)();
        const { recordset } = yield pool.request()
            .input('ID_Aeropuerto', mssql_1.default.Int, idAirport)
            .execute('SP_Dispositivo_VerFavoritos_por_token');
        pool.close();
        if (recordset.length == 0) {
            return [];
        }
        const tokens = new Array();
        recordset.forEach(item => {
            tokens.push(item.Token);
        });
        return tokens;
    }
    catch (err) {
        console.error(err);
        throw new Error('Error in getTokens');
    }
});
//# sourceMappingURL=notifications.controllers.js.map