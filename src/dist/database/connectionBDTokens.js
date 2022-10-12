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
exports.getConnetionTokens = void 0;
const mssql_1 = __importDefault(require("mssql"));
const config_1 = __importDefault(require("../config"));
const dbSettings = {

    user: config_1.default.user_db,
    password: config_1.default.pass_db,
    server: config_1.default.server_db,
    database: config_1.default.name_db,
    options: {
        encrypt: true,
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};
const getConnetionTokens = () => __awaiter(void 0, void 0, void 0, function*() {
    try {
        return yield mssql_1.default.connect(dbSettings);
    } catch (error) {
        throw new Error(error);
    }
});
exports.getConnetionTokens = getConnetionTokens;
//# sourceMappingURL=connectionBDTokens.js.map