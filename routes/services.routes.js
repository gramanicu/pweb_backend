import express from 'express';
import ServiceController from '../controllers/serviceController.js';

const ServiceRouter = express.Router();

ServiceRouter.get('/', ServiceController.getAllServices);
ServiceRouter.get('/:id', ServiceController.getService);
ServiceRouter.post('/new', ServiceController.addService);

export default ServiceRouter;