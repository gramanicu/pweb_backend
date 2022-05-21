import express from 'express';
import { claimIncludes } from 'express-oauth2-jwt-bearer';
import AccommodationRequestController from '../controllers/accommodationRequest.controller.js';

const AccommodationRequestRouter = express.Router();

AccommodationRequestRouter.get(
    '/',
    claimIncludes('permissions', 'view:acc-request'),
    AccommodationRequestController.getAllAccommodationRequests
);
AccommodationRequestRouter.post(
    '/new',
    claimIncludes('permissions', 'create:acc-request'),
    AccommodationRequestController.addAccommodationRequest
);
AccommodationRequestRouter.get(
    '/:id',
    claimIncludes('permissions', 'view:acc-request'),
    AccommodationRequestController.getAccommodationRequest
);
AccommodationRequestRouter.put(
    '/:id/respond',
    claimIncludes('permissions', 'respond:acc-request'),
    AccommodationRequestController.respondAccommodationRequest
);

export default AccommodationRequestRouter;
