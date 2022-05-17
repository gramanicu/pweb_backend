import express, { Router } from "express";
import LocationRouter from "./locations.routes.js";
import UserRouter from "./users.routes.js";
import ServiceRouter from "./services.routes.js";
import AccomodationRequestRouter from "./accomodationRequests.routes.js";

const router = express.Router();

router.use('/locations', LocationRouter);
router.use('/users', UserRouter);
router.use('/services', ServiceRouter);
router.use('/accomodation-request', AccomodationRequestRouter);

export default router;