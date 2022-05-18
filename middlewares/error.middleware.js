const errorMiddleware = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).send({ msg: 'Invalid token' });
    }

    if (err.name === 'InsufficientScopeError' || err.name === 'InvalidTokenError') {
        return res.status(403).send({ msg: 'No permissions for this route' });
    }

    console.log(err);
    next(err);
};

export default errorMiddleware;
