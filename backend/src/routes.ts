import express from 'express';
import { celebrate, Joi } from 'celebrate';
import multer from 'multer';
import multerConfig from './config/multer';

import PlacesController from './controllers/PlacesController';
import TypesController from './controllers/TypesController';

const routes = express.Router();
const upload = multer(multerConfig);

const placesController = new PlacesController();
const typesController = new TypesController();

routes.get('/types', typesController.index);

routes.get('/places', placesController.index);
routes.get('/places/:id', placesController.show);
routes.post('/places', upload.single('image'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      website: Joi.string(),
      phone: Joi.number().min(9).max(9),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      council: Joi.string().required(),
      district: Joi.string().required(),
      types: Joi.string().required(),
    })
  }, {
    abortEarly: false
  }),
placesController.create);
 
export default routes;
