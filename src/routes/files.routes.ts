import { Router } from 'express';
import { check } from 'express-validator';

import { getAllFiles, getDocumentosById } from '../controllers/files.controllers';
import { fieldsValidation } from '../middlewares/inputs-validation'


const route = Router();

route.get('/', getAllFiles);

route.get('/id/:id', [
    check('id', 'The id airport field is required').not().isEmpty(),
    check('id', 'The id field must be numeric').isNumeric(),
    fieldsValidation
], getDocumentosById);

export default route;