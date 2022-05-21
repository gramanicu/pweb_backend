import auth0Middleware from '../middlewares/auth0.middleware.js';
import prisma from '../prismaClient.js';

const getAllLocations = async (req, res) => {
    if (res.locals.role == 'owner') {
        const ownerLocations = await prisma.owner.findUnique({
            where: {
                auth0_id: res.locals.auth0_id,
            },
            include: {
                locations: true,
            },
        });

        if (ownerLocations) {
            res.json(ownerLocations.locations).end();
            return;
        }
        res.status(404).end();
        return;
    }

    const locations = await prisma.location.findMany();

    res.json(locations);
    res.status(200).end();
    return;
};

const addLocation = async (req, res) => {
    const owner = await prisma.owner.findUnique({
        where: {
            auth0_id: res.locals.auth0_id,
        },
    });

    const location = await prisma.location.create({
        data: {
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            owner: {
                connect: {
                    id: owner.id,
                },
            },
        },
    });
    res.json(location).end();
    return;
};

const getLocation = async (req, res) => {

    if (parseInt(req.params.id) < 1 ) {
        res.status(400).end();
    }
    const location = await prisma.location.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
        include: {
            owner: true,
            services: true,
        },
    });

    
    if (location) {
        res.json(location).end();
        return;
    }
    else {
        res.status(404).end();
        return;
    }
};

const leaveLocation = async (req, res) => {
    const updateRefugee = await prisma.refugee.update({
        where: {
            auth0_id: res.locals.auth0_id,
        },
        data: {
            id_loc: -1,
        },
    });

    return res.json(updateRefugee).end();
};

const LocationController = { getAllLocations, addLocation, getLocation, leaveLocation };

export default LocationController;
