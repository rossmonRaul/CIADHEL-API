"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_controllers_1 = require("../controllers/user.controllers");
const inputs_validation_1 = require("../middlewares/inputs-validation");
const route = (0, express_1.Router)();
route.post('/', user_controllers_1.postAutenticationLogin);
route.post('/login/:cedula/:password', [
    (0, express_validator_1.check)('cedula', 'The username field is required').not().isEmpty(),
    (0, express_validator_1.check)('cedula', 'The username field must be numeric').isNumeric(),
    (0, express_validator_1.check)('password', 'The password field is required').not().isEmpty(),
    inputs_validation_1.fieldsValidation
], user_controllers_1.postAutenticationLogin);
exports.default = route;
//# sourceMappingURL=users.routes.js.map