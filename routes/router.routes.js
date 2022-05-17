import express, { Router } from "express";
import LocationRouter from "./locations.routes.js";
import UserRouter from "./users.routes.js";
import ServiceRouter from "./services.routes.js";
import AccomodationRequestRouter from "./accomodationRequests.routes.js";
import checkJwt from "../middlewares/checkJwt.js";

const router = express.Router();

router.use('/locations', checkJwt, LocationRouter);
router.use('/users', UserRouter);
router.use('/services', checkJwt, ServiceRouter);
router.use('/accomodation-request', checkJwt, AccomodationRequestRouter);

export default router;