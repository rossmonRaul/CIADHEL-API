import { Router } from 'express';
import { check } from 'express-validator';

import { fieldsValidation } from '../middlewares/inputs-validation';
import { existIdentifier, getAllTokens, saveToken, sendNotificationPush } from '../controllers/notifications.controllers';

const route = Router();

route.get('/tokens', getAllTokens );

route.get('/identifier/:identifier', [
    check('identifier', 'The identifier field is required').not().isEmpty(),
], existIdentifier);

route.post('/tokens', [
    check('identifier', 'The identifier field is required').not().isEmpty(),
    check('token', 'The token field is required').not().isEmpty(),
    fieldsValidation
], saveToken );

route.post('/', [
    check('idAirport', 'The identifier field is required').not().isEmpty(),
    check('title', 'The title field is required').not().isEmpty(),
    check('body', 'The body field is required').not().isEmpty(),
],sendNotificationPush );


export default route;