"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const airports_controllers_1 = require("../controllers/airports.controllers");
const airports_controllers_2 = require("../controllers/airports.controllers");
const inputs_validation_1 = require("../middlewares/inputs-validation");
const route = (0, express_1.Router)();
route.get('/', airports_controllers_1.getAllAirports);
route.get('/size', airports_controllers_1.getLengthAirports);
route.post('/lastDate/:id', airports_controllers_1.getIsUpdateAirport);
route.get('/name/:name', [
    (0, express_validator_1.check)('name', 'The name airport field is required').not().isEmpty(),
    inputs_validation_1.fieldsValidation
], airports_controllers_1.getAllAirportByName);
route.get('/id/:id', [
    (0, express_validator_1.check)('id', 'The id airport field is required').not().isEmpty(),
    (0, express_validator_1.check)('id', 'The id field must be numeric').isNumeric(),
    inputs_validation_1.fieldsValidation
], airports_controllers_1.getAnAirportById);
//**************************************************************************/
//made by Olman Sanchez Zuniga
route.get('/search/:name', [
    (0, express_validator_1.check)('name', 'The name airport field is required').not().isEmpty(),
    (0, express_validator_1.check)('name', 'name must not be numeric').not().isNumeric(),
    inputs_validation_1.fieldsValidation
], airports_controllers_2.getAirportBySearch);
// CODE BY RK
route.put("/update/:Ejecutables/:IDAeropuerto", [
    (0, express_validator_1.check)("Ejecutables", "The Ejecutables field is required").not().isEmpty(),
    (0, express_validator_1.check)("IDAeropuerto", "The IDAeropuerto field must be numeric").isNumeric(),
    inputs_validation_1.fieldsValidation,
], airports_controllers_1.putAnAirport); //input parameters Ejecutables (varchar) and IDAeropuerto (int)
// made by Bryan Rivera - Insert
route.post('/favorito/', airports_controllers_1.postFavoriteAirports);
// made by Bryan Rivera - Delete
route.delete('/favorito/:ID_Aeropuerto/:Identificador', airports_controllers_1.deleteFavoriteAirports);
route.get('/favorito/:ID_Aeropuerto/:Identificador', airports_controllers_1.getValidateExist);
route.get('/favorito/:Identificador', airports_controllers_1.getFavoritebyIdentificador);
route.get('/clima/:nombre', airports_controllers_1.getMeteorology);
exports.default = route;
//# sourceMappingURL=airports.routes.js.map