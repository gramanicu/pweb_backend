import express from 'express';
import LocationController from '../controllers/locationController.js';

const LocationRouter = express.Router();

LocationRouter.get('/', LocationController.getAllLocations);
LocationRouter.post('/new', LocationController.addLocation);
LocationRouter.delete('/leave', LocationController.leaveLocation);
LocationRouter.get('/:id', LocationController.getLocation);

export default LocationRouter;