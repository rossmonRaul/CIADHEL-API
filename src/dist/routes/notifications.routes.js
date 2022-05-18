"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const inputs_validation_1 = require("../middlewares/inputs-validation");
const notifications_controllers_1 = require("../controllers/notifications.controllers");
const route = (0, express_1.Router)();
route.get('/tokens', notifications_controllers_1.getAllTokens);
route.get('/identifier/:identifier', [
    (0, express_validator_1.check)('identifier', 'The identifier field is required').not().isEmpty(),
], notifications_controllers_1.existIdentifier);
route.post('/tokens', [
    (0, express_validator_1.check)('identifier', 'The identifier field is required').not().isEmpty(),
    (0, express_validator_1.check)('token', 'The token field is required').not().isEmpty(),
    inputs_validation_1.fieldsValidation
], notifications_controllers_1.saveToken);
route.post('/', [
    (0, express_validator_1.check)('idAirport', 'The identifier field is required').not().isEmpty(),
    (0, express_validator_1.check)('title', 'The title field is required').not().isEmpty(),
    (0, express_validator_1.check)('body', 'The body field is required').not().isEmpty(),
], notifications_controllers_1.sendNotificationPush);
exports.default = route;
//# sourceMappingURL=notifications.routes.js.map