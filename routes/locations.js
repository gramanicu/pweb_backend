import express from 'express';
import { PrismaClient } from '@prisma/client';
import LocationController from '../controllers/locationController.js';

const LocationRouter = express.Router();

LocationRouter.get('/', LocationController.getLocations);


export default LocationRouter;