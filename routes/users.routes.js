import express from 'express';
import UserController from '../controllers/user.controller.js';
import auth0Middleware from '../middlewares/auth0.middleware.js';
import checkJwt from '../middlewares/checkJwt.middleware.js';
import { claimIncludes } from 'express-oauth2-jwt-bearer';

const UserRouter = express.Router();

UserRouter.post('/new', UserController.addUser);
UserRouter.get(
    '/get',
    checkJwt,
    auth0Middleware,
    claimIncludes('permissions', 'view:user-data'),
    UserController.getUser
);

export default UserRouter;
