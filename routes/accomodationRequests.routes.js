import express from 'express';
import AccomodationRequestController from '../controllers/accomodationRequestController.js';

const AccomodationRequestRouter = express.Router();

AccomodationRequestRouter.get('/', AccomodationRequestController.getAllAccomodationRequests);
AccomodationRequestRouter.post('/new', AccomodationRequestController.addAccomodationRequest);
AccomodationRequestRouter.get('/:id', AccomodationRequestController.getAccomodationRequest);
AccomodationRequestRouter.put('/:id/respond', AccomodationRequestController.respondAccomodationRequest);

export default AccomodationRequestRouter;