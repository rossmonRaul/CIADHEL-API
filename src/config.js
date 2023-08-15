"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
// Configuration of dotenv
(0, dotenv_1.config)();
// Export configuration object
exports.default = {
    port: process.env.PORT || 3033,
    user_db: ((_a = process.env.USER_DB) === null || _a === void 0 ? void 0 : _a.toString()) || 'db_a9a751_nuvianbd_admin',
    pass_db: ((_b = process.env.PASSWORD_DB) === null || _b === void 0 ? void 0 : _b.toString()) || 'Nv2023!.',
    server_db: ((_c = process.env.SERVER_DB) === null || _c === void 0 ? void 0 : _c.toString()) || 'SQL8001.site4now.net',
    name_db: ((_d = process.env.NAME_DB) === null || _d === void 0 ? void 0 : _d.toString()) || 'db_a9a751_nuvianbd',
    user_db_tokens: ((_e = process.env.USER_DB_TOKENS) === null || _e === void 0 ? void 0 : _e.toString()) || '',
    password_db_tokens: ((_f = process.env.PASSWORD_DB_TOKENS) === null || _f === void 0 ? void 0 : _f.toString()) || '',
    server_db_tokens: ((_g = process.env.SERVER_DB_TOKENS) === null || _g === void 0 ? void 0 : _g.toString()) || '',
    name_db_tokens: ((_h = process.env.NAME_DB_TOKENS) === null || _h === void 0 ? void 0 : _h.toString()) || '',
    fmc_server_key: ((_j = process.env.FMC_SERVER_KEY) === null || _j === void 0 ? void 0 : _j.toString()) || ''
};
