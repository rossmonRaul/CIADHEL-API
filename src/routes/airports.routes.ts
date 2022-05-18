import { Router } from 'express';
import { check } from 'express-validator';

import { getAllAirports, getAllAirportByName, getAnAirportById, getLengthAirports, getIsUpdateAirport, putAnAirport, postFavoriteAirports, deleteFavoriteAirports, getValidateExist, getFavoritebyIdentificador } from '../controllers/airports.controllers';
import { getAirportBySearch } from '../controllers/airports.controllers';
import { fieldsValidation } from '../middlewares/inputs-validation';

const route = Router();

route.get('/', getAllAirports );

route.get('/size', getLengthAirports );

route.post('/lastDate/:id', getIsUpdateAirport );

route.get('/name/:name',[
    check('name', 'The name airport field is required').not().isEmpty(),
    fieldsValidation
], getAllAirportByName );

route.get('/id/:id',[
    check('id', 'The id airport field is required').not().isEmpty(),
    check('id', 'The id field must be numeric').isNumeric(),
    fieldsValidation
], getAnAirportById );

//**************************************************************************/
//made by Olman Sanchez Zuniga
route.get('/search/:name',[
    check('name', 'The name airport field is required').not().isEmpty(),
    check('name','name must not be numeric').not().isNumeric(),
    fieldsValidation
], getAirportBySearch);

// CODE BY RK
route.put(
    "/update/:Ejecutables/:IDAeropuerto",
    [
      check("Ejecutables", "The Ejecutables field is required").not().isEmpty(),
      check("IDAeropuerto", "The IDAeropuerto field must be numeric").isNumeric(),
      fieldsValidation,
    ],
    putAnAirport
  ); //input parameters Ejecutables (varchar) and IDAeropuerto (int)


// made by Bryan Rivera - Insert
   route.post('/favorito/', postFavoriteAirports );

// made by Bryan Rivera - Delete
  route.delete('/favorito/:ID_Aeropuerto/:Identificador', deleteFavoriteAirports );


  route.get('/favorito/:ID_Aeropuerto/:Identificador', getValidateExist );

  route.get('/favorito/:Identificador', getFavoritebyIdentificador );

  
export default route;