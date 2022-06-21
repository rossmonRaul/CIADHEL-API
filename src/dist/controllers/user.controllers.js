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
exports.postAutenticationLogin = void 0;
const connection_1 = require("../database/connection");
const mssql_1 = __importDefault(require("mssql"));
var jwt = require('jsonwebtoken');
var express = require('express');
const postAutenticationLogin = (req, res) => __awaiter(void 0, void 0, void 0, function*() {
    //validations 
    try {
        //cont var to login
        const cedula = req.params.cedula;
        const password = req.params.password;
        //if id and passwor equals 0 
        if (!cedula || !password) {
            res.status(400).json({
                ok: false,
                message: 'Please enter username and password'
            });
        } else {
            //get connection
            const pool = yield(0, connection_1.getConnetion)();
            const { recordset: users } = yield pool.request()
                .input('Cedula', mssql_1.default.VarChar(50), cedula)
                .input('Contraseña', mssql_1.default.VarChar(50), password)
                .execute('SP_Usuario_Inicio_de_sesion');
            pool.close();
            // var to get ID_airport
            const { Cedula, ID_Aeropuerto } = users[0];
            const user = { Cedula, ID_Aeropuerto };
            if (users.length === 0) {
                return res.status(404).json({
                    ok: false,
                    msg: 'You are not logged' + cedula
                });
            }
            return res.status(200).json({
                ok: true,
                cedula: cedula,
                airport: user
                    //token: token
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error while trying to log in',
            error: err
        });
    }
});
exports.postAutenticationLogin = postAutenticationLogin;
const getUsersInfo = (req, res) => __awaiter(void 0, void 0, void 0, function*() {
    try {
        const pool = yield(0, connection_1.getConnetion)();
        const { recordset } = yield pool.request().execute('SP_ListarUsuario');
        pool.close();
        if (recordset.length === 0) {
            return res.status(404).json({
                ok: false,
                length: 0,
                msg: 'There are no users information'
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
            msg: 'Error on get users information'
        });
    }
});
exports.getUsersInfo = getUsersInfo;
const getUsersInfobyId = (req, res) => __awaiter(void 0, void 0, void 0, function*() {
    try {
        const { id } = req.params;
        const pool = yield(0, connection_1.getConnetion)();
        const { recordset } = yield pool.request()
            .input('cedula', mssql_1.default.Int, id)
            .execute('SP_ListarUsuariobyID');
        pool.close();
        if (recordset.length === 0) {
            return res.status(404).json({
                ok: false,
                length: 0,
                msg: 'There are no users with this id'
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
            msg: 'Error in get users with id'
        });
    }
});
exports.getUsersInfobyId = getUsersInfobyId;

const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //variables
        let {  Nombre, Apellido1, Apellido2, Cedula, ID_Aeropuerto, Correo, Telefono, FechaNacimiento, Contraseña} = req.body;
        const pool = yield(0, connection_1.getConnetion)();
        console.log(req.body);
        const { recordset } = yield pool
            .request()
           
            .input("Nombre", mssql_1.default.VarChar(25), Nombre)
            .input("Apellido1", mssql_1.default.VarChar(25), Apellido1)
            .input("Apellido2", mssql_1.default.VarChar(25), Apellido2)
            .input("Cedula", mssql_1.default.VarChar(10), Cedula)
            .input("ID_Aeropuerto", mssql_1.default.Int, ID_Aeropuerto)
            .input("Correo", mssql_1.default.VarChar(25), Correo)
            .input("Telefono", mssql_1.default.Int, Telefono)
            .input("FechaNacimiento", mssql_1.default.Date, FechaNacimiento)
            .input("Contraseña", mssql_1.default.VarChar(25), Contraseña)
            .execute('SP_Usuarios_Agregar');
        pool.close();
        if (recordset === undefined) {
            return res.status(404).json({
                ok: false,
                msg: 'Error insert user'
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
            msg: "Request Error, can't insert user",
        });
    }
});
exports.postUser = postUser;

const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ID_USR } = req.params; // required parameter IDAeropuerto
    try {
        const pool = yield(0, connection_1.getConnetion)();
        const { recordset } = yield pool
            .request()
            .input("ID_USR", mssql_1.default.Int, ID_USR)
            
            .execute('SP_Usuarios_Eliminar');
        pool.close();
        if (recordset === undefined) {
            return res.status(404).json({
                ok: false,
                msg: 'Error delete a user'
            });
        }
        return res.status(200).json({
            ok: true,
            msg: 'Ok'
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            msg: "Request Error, cant delete a user",
        });
    }
});
exports.deleteUser = deleteUser;


const putEditUsers = (req, res) => __awaiter(void 0, void 0, void 0, function*() {
    try {
        //variables
        let { ID_USR, Nombre, Apellido1, Apellido2, Cedula, ID_Aeropuerto, Correo, Telefono, FechaNacimiento, } = req.body;
        const pool = yield(0, connection_1.getConnetion)();
        console.log(req.body);
        const { recordset } = yield pool
            .request()
            .input("ID_USR", mssql_1.default.Int, ID_USR)
            .input("Nombre", mssql_1.default.VarChar(25), Nombre)
            .input("Apellido1", mssql_1.default.VarChar(25), Apellido1)
            .input("Apellido2", mssql_1.default.VarChar(25), Apellido2)
            .input("Cedula", mssql_1.default.VarChar(10), Cedula)
            .input("ID_Aeropuerto", mssql_1.default.Int, ID_Aeropuerto)
            .input("Correo", mssql_1.default.VarChar(25), Correo)
            .input("Telefono", mssql_1.default.Int, Telefono)
            .input("FechaNacimiento", mssql_1.default.Date, FechaNacimiento)
            .execute('SP_EditarUsuario');
        pool.close();
        if (recordset === undefined) {
            return res.status(404).json({
                ok: false,
                msg: 'Error update user'
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
            msg: "Request Error, can't modify user",
        });
    }
});
exports.putEditUsers = putEditUsers;
//# sourceMappingURL=user.controllers.js.map