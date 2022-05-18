import { Router } from "express";
import {check} from 'express-validator';

import { postAutenticationLogin } from '../controllers/user.controllers';
import { fieldsValidation } from '../middlewares/inputs-validation';
const route = Router();
route.post('/', postAutenticationLogin );


route.post('/login/:cedula/:password',[
    check('cedula', 'The username field is required').not().isEmpty(),
    check('cedula', 'The username field must be numeric').isNumeric(),
    check('password', 'The password field is required').not().isEmpty(),
    fieldsValidation
], postAutenticationLogin );
export default route;
