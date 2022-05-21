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
        }
        res.status(404).end();
    }

    const locations = await prisma.location.findMany();

    res.json(locations);
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
    res.json(location);
};

const getLocation = async (req, res) => {
    const owner = await prisma.owner.findUnique({
        where: {
            auth0_id: res.locals.auth0_id,
        },
    });

    if (owner) {
        const location = await prisma.location.findUnique({
            where: {
                id_id_owner: {
                    id: parseInt(req.params.id),
                    id_owner: owner.id,
                },
            },
            include: {
                owner: true,
                services: true,
            },
        });
        res.json(location);
    }

    res.status(404);
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

    res.json(updateRefugee);
};

const LocationController = { getAllLocations, addLocation, getLocation, leaveLocation };

export default LocationController;
