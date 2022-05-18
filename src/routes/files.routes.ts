import { Router } from "express";
import {check} from 'express-validator';

import {  GetAirportFile } from '../controllers/files.controllers';
import { fieldsValidation } from '../middlewares/inputs-validation';
const route = Router();

route.get('/file/:name',[
    check('name', 'The name airport field is required').not().isEmpty(),
    check('name', 'The name airport field must be a string').isString(),
    check('name', 'The name airport field must be no numeric').not().isNumeric(),
    fieldsValidation
], GetAirportFile);
export default route;