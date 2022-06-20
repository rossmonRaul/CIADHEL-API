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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha = __importStar(require("mocha"));
const supertest_1 = __importDefault(require("supertest"));
const API = 'https://ciiadhel-api-rest.herokuapp.com';
mocha.describe('Get all airports /api/airports', () => {
    mocha.it('respond with json contaning all airports', done => {
        (0, supertest_1.default)(API)
            .get('/api/airports')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
});
mocha.describe('Get all airports by Name /api/airports/name/nameAirport', () => {
    mocha.it('respond with json contaning all airports by names', done => {
        (0, supertest_1.default)(API)
            .get('/api/airports/name/J')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .expect({
            "ok": true,
            "length": 2,
            "airports": [
                {
                    "ID_Aeropuerto": 23,
                    "Nombre": "Aeropuerto Internacional Juan Santamaría",
                    "Nombre_OACI": "MROC",
                    "NombreICAO": "SJO",
                    "Direccion_Exacta": "Alajuela, Alajuela",
                    "Pista": "07|25",
                    "Coordenada": "9°59 38\"N 84°12 32\"O",
                    "Elevacion": "921 m / 3021 pies",
                    "Espacio_Aereo": "No disponible",
                    "Numero_Telefono1": "(506) 2437-2400",
                    "Horario": "24 horas"
                },
                {
                    "ID_Aeropuerto": 24,
                    "Nombre": "Puerto Jiménez",
                    "Nombre_OACI": "MRPJ",
                    "NombreICAO": "MRPJ",
                    "Direccion_Exacta": "Golfito, Puntarenas",
                    "Pista": "16|34",
                    "Coordenada": "8°32 00\"N 83°18 00\"O",
                    "Elevacion": "10 m / 33 pies",
                    "Espacio_Aereo": "No disponible",
                    "Numero_Telefono1": "(506) 8466-5262",
                    "Horario": "10:00 -  18:00"
                }
            ]
        })
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
    mocha.it('respond with message error and 404 not found an airport by names', done => {
        (0, supertest_1.default)(API)
            .get('/api/airports/name/noairport')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(404)
            .expect({
            "ok": false,
            "msg": "There are no airports with name noairport"
        })
            .end(err => {
            if (err)
                return done(err);
            done(err);
        });
    });
});
mocha.describe('Get an airport by Id /api/airports/id/idAirport', () => {
    mocha.it('respond with json containg an aiport by Id', done => {
        (0, supertest_1.default)(API)
            .get('/api/airports/id/14')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .expect({
            "ok": true,
            "Aeropuerto": {
                "ID_Aeropuerto": 14,
                "Nombre": "Buenos Aires",
                "Nombre_OACI": "MRBA",
                "NombreICAO": " MRBA",
                "Estado_Aeropuerto": "Abierto",
                "Ultima_Actualizacion": "2022-02-28T06:42:00.000Z"
            },
            "Caracteristicas_Especiales": {
                "ID_CarESP_Aero": 14,
                "ID_Aeropuerto": 14,
                "Publico": 1,
                "Controlado": 0,
                "Coordenada": "9°09 49\"N 83°19 48\"O",
                "Info_Torre": "No disponible",
                "Info_General": "No disponible",
                "Espacio_Aereo": "No disponible",
                "Combustible": "No disponible",
                "Norma_General": "No disponible",
                "Norma_Particular": "Precaución umbral Pista 04 tendido eléctrico en vía pública y umbral desplazado 100 m Pista 22"
            },
            "Frecuencias": [
                {
                    "ID_Frecuencia": 66,
                    "Frecuencia": "0.00",
                    "TipoFrecuencia": "ATIS"
                },
                {
                    "ID_Frecuencia": 67,
                    "Frecuencia": "0.00",
                    "TipoFrecuencia": "GRND"
                },
                {
                    "ID_Frecuencia": 68,
                    "Frecuencia": "0.00",
                    "TipoFrecuencia": "TWR"
                },
                {
                    "ID_Frecuencia": 69,
                    "Frecuencia": "0.00",
                    "TipoFrecuencia": "EMERGENCY"
                },
                {
                    "ID_Frecuencia": 70,
                    "Frecuencia": "0.00",
                    "TipoFrecuencia": "Otras"
                }
            ],
            "NOTAMS": [],
            "Pistas": {
                "ID_Pista": 14,
                "ID_Aeropuerto": 14,
                "Pista": "01|19",
                "Elevacion": "370 m / 1214 pies",
                "Superficie_Pista": "concreto",
                "ASDA_Rwy_1": 958,
                "ASDA_Rwy_2": 958,
                "TODA_Rwy_1": 958,
                "TODA_Rwy_2": 958,
                "TORA_Rwy_1": 958,
                "TORA_Rwy_2": 958,
                "LDA_Rwy_1": 958,
                "LDA_Rwy_2": 958
            },
            "Contacto": {
                "ID_Contacto": 14,
                "ID_Aeropuerto": 14,
                "Direccion_Exacta": "Buenos Aires, Puntarenas",
                "Numero_Telefono1": "(506) 8456-4604",
                "Numero_Telefono2": "No disponible",
                "Horario": "05:51 - 17:44"
            }
        })
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
    mocha.it('respond with message error and 404 not found an airport by ID', done => {
        (0, supertest_1.default)(API)
            .get('/api/airports/id/785')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(404)
            .expect({
            "ok": false,
            "msg": "There are no airport with id 785"
        })
            .end(err => {
            if (err)
                return done(err);
            done(err);
        });
    });
    mocha.it('respond message error with id must be numeric', done => {
        (0, supertest_1.default)(API)
            .get('/api/airports/id/sa78')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(400)
            .expect({
            "errors": [
                {
                    "value": "sa78",
                    "msg": "The id field must be numeric",
                    "param": "id",
                    "location": "params"
                }
            ]
        })
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
});
mocha.describe('Get size of airports /api/airports/size', () => {
    mocha.it('respond with json containg size of airports', done => {
        (0, supertest_1.default)(API)
            .get('/api/airports/size')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .expect({
            "ok": true,
            "size": 26
        })
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
});
mocha.describe('Post verification update /api/airports/lastDate/IdAirport', () => {
    mocha.it('respond with json containing var bool if update is needed', done => {
        (0, supertest_1.default)(API)
            .post('/api/airports/lastDate/4')
            .set('Accept', 'application/json')
            .send({
            lastDate: "2022-02-28T06:42:00.000Z"
        })
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .expect({
            "ok": true,
            "update": false
        })
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
});
//# sourceMappingURL=airports.test.js.map