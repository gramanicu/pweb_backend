import express from 'express';
import { claimIncludes } from 'express-oauth2-jwt-bearer';
import LocationController from '../controllers/location.controller.js';

const LocationRouter = express.Router();

LocationRouter.get('/', claimIncludes('permissions', 'view:location'), LocationController.getAllLocations);
LocationRouter.post('/new', claimIncludes('permissions', 'create:location'), LocationController.addLocation);
LocationRouter.delete('/leave', claimIncludes('permissions', 'leave:location'), LocationController.leaveLocation);
LocationRouter.get('/:id', claimIncludes('permissions', 'view:location'), LocationController.getLocation);

export default LocationRouter;
