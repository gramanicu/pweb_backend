import express from 'express';
import GenericController from '../controllers/generic.controller.js';

const GenericRouter = express.Router();

GenericRouter.get('/countries', GenericController.getAllCountries);
GenericRouter.get('/languages', GenericController.getAllLanguages);
GenericRouter.get('/countries/:id', GenericController.getCountry);
GenericRouter.get('/languages/:id', GenericController.getLanguage);

export default GenericRouter;
