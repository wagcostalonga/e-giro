import express from 'express';
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
routes.post('/places', upload.single('image'), placesController.create);
 
export default routes;