import express, { Router } from 'express';
import LocationRouter from './locations.routes.js';
import UserRouter from './users.routes.js';
import ServiceRouter from './services.routes.js';
import AccommodationRequestRouter from './accommodationRequests.routes.js';
import auth0Middleware from '../middlewares/auth0.middleware.js';
import checkJwt from '../middlewares/checkJwt.middleware.js';
import notFoundRouter from './error.routes.js';
import GenericRouter from './generic.routes.js';

const router = express.Router();

router.use('/locations', checkJwt, auth0Middleware, LocationRouter);
router.use('/users', UserRouter);
router.use('/services', checkJwt, auth0Middleware, ServiceRouter);
router.use('/accommodation-request', checkJwt, auth0Middleware, AccommodationRequestRouter);
router.use('/generic', GenericRouter);

// ALWAYS KEEP THIS LAST
router.use('*', notFoundRouter);

export default router;
