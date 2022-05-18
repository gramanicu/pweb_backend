import express from 'express';
const notFoundRouter = express.Router();

notFoundRouter.get('*', (req, res, next) => {
    res.status(404).end('Not found');
});

export default notFoundRouter;
