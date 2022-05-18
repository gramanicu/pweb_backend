import express from 'express';
import AccommodationRequestController from '../controllers/accommodationRequest.controller.js';

const AccommodationRequestRouter = express.Router();

AccommodationRequestRouter.get('/', AccommodationRequestController.getAllAccommodationRequests);
AccommodationRequestRouter.post('/new', AccommodationRequestController.addAccommodationRequest);
AccommodationRequestRouter.get('/:id', AccommodationRequestController.getAccommodationRequest);
AccommodationRequestRouter.put('/:id/respond', AccommodationRequestController.respondAccommodationRequest);

export default AccommodationRequestRouter;
