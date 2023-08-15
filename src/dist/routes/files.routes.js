"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const files_controllers_1 = require("../controllers/files.controllers");
const inputs_validation_1 = require("../middlewares/inputs-validation");
const route = (0, express_1.Router)();
route.get('/', files_controllers_1.getAllFiles);
route.get('/id/:id', [
    (0, express_validator_1.check)('id', 'The id airport field is required').not().isEmpty(),
    (0, express_validator_1.check)('id', 'The id field must be numeric').isNumeric(),
    inputs_validation_1.fieldsValidation
], files_controllers_1.getDocumentosById);
exports.default = route;
//# sourceMappingURL=files.routes.js.map