import express from 'express';
import UserController from '../controllers/user.controller.js';

const UserRouter = express.Router();

UserRouter.post('/new', UserController.addUser);

export default UserRouter;
