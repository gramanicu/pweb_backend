import express from 'express';
import { claimIncludes } from 'express-oauth2-jwt-bearer';
import ServiceController from '../controllers/service.controller.js';

const ServiceRouter = express.Router();

ServiceRouter.get('/', claimIncludes('permissions', 'view:service'), ServiceController.getAllServices);
ServiceRouter.get('/:id', claimIncludes('permissions', 'view:service'), ServiceController.getService);
ServiceRouter.post('/new', claimIncludes('permissions', 'create:service'), ServiceController.addService);

export default ServiceRouter;
