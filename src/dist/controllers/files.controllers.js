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
exports.GetAirportFile = void 0;
const connection_1 = require("../database/connection");
const mssql_1 = __importDefault(require("mssql"));
const GetAirportFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const file = 'src/access/files/MROC.pdf';
        if (!name) {
            res.status(400).json({
                ok: false,
                message: 'Error on find airport'
            });
        }
        else {
            const pool = yield (0, connection_1.getConnetion)();
            const { recordset: data } = yield pool.request()
                .input('Nombre', mssql_1.default.VarChar(200), name)
                .execute('SP_Aeropuerto_Buscador');
            pool.close();
            const { ID_Aeropuerto, Nombre, Nombre_OACI, NombreICAO } = data[0];
            const airport = {
                ID_Aeropuerto,
                Nombre,
                Nombre_OACI,
                NombreICAO
            };
            if (ID_Aeropuerto == 23) {
                if (data === undefined) {
                    return res.status(404).json({
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
            else if (ID_Aeropuerto != 23) {
                if (data === undefined) {
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
            else {
                return res.status(404).json({
                    ok: false,
                    msg: 'There are no airports you are looking for' + name
                });
            }
        }
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error on find some airports'
        });
    }
});
exports.GetAirportFile = GetAirportFile;
//# sourceMappingURL=files.controllers.js.map