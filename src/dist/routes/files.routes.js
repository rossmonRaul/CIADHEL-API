"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const files_controllers_1 = require("../controllers/files.controllers");
const inputs_validation_1 = require("../middlewares/inputs-validation");
const route = (0, express_1.Router)();
route.get('/file/:name', [
    (0, express_validator_1.check)('name', 'The name airport field is required').not().isEmpty(),
    (0, express_validator_1.check)('name', 'The name airport field must be a string').isString(),
    (0, express_validator_1.check)('name', 'The name airport field must be no numeric').not().isNumeric(),
    inputs_validation_1.fieldsValidation
], files_controllers_1.GetAirportFile);
exports.default = route;
//# sourceMappingURL=files.routes.js.map