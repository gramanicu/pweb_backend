import express from 'express';

const auth0Middleware = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        const base64Url = Buffer.from(token.split('.')[1], 'base64');

        const decoded = JSON.parse(base64Url.toString('utf8'));
        res.locals.auth0_id = decoded.sub;
        next();
    }
};

export default auth0Middleware;
