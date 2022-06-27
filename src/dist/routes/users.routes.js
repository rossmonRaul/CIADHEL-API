"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_controllers_1 = require("../controllers/user.controllers");
const inputs_validation_1 = require("../middlewares/inputs-validation");
const route = (0, express_1.Router)();
route.get('/UsersInfo', user_controllers_1.getUsersInfo);
route.post('/', user_controllers_1.postAutenticationLogin);
route.post('/login/:cedula/:password', [
    (0, express_validator_1.check)('cedula', 'The username field is required').not().isEmpty(),
    (0, express_validator_1.check)('cedula', 'The username field must be numeric').isNumeric(),
    (0, express_validator_1.check)('password', 'The password field is required').not().isEmpty(),
    inputs_validation_1.fieldsValidation
], user_controllers_1.postAutenticationLogin);
route.get('/UsersInfoID/:id', user_controllers_1.getUsersInfobyId);
route.put('/EditarUsuario/', user_controllers_1.putEditUsers);
route.post('/postUsuarios/', user_controllers_1.postUser);
route.delete('/deleteUsuarios/:ID_USR', user_controllers_1.deleteUser);
exports.default = route;
//# sourceMappingURL=users.routes.js.map