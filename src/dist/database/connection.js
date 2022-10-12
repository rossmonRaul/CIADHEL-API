"use strict";
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }
    return new(P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }

        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }

        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnetion = void 0;
var sql = require('mssql');
const config_1 = __importDefault(require("../config"));
const dbSettings = {

    user: 'db_a8e270_nuvianbd2_admin',
    password: 'Nuvian123',
    server: 'sql5102.site4now.net',
    database: 'db_a8e270_nuvianbd2',
    options: {
        encrypt: false,
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};
const getConnetion = () => __awaiter(void 0, void 0, void 0, function*() {
    try {
        return yield sql.connect(dbSettings);
    } catch (error) {
        throw new Error(error);
    }
});
exports.getConnetion = getConnetion;
//# sourceMappingURL=connection.js.map