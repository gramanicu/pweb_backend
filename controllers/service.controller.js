import prisma from '../prismaClient.js';

const addService = async (req, res) => {
    const provider = await prisma.provider.findUnique({
        where: {
            auth0_id: res.locals.auth0_id,
        },
    });

    const service = await prisma.service.create({
        data: {
            type: req.body.type,
            name: req.body.name,
            description: req.body.description,
            provider: {
                connect: {
                    id: provider.id,
                },
            },
            location: {
                connect: {
                    id: req.body.id_loc,
                },
            },
        },
    });
    res.json(service).end();
    return;
};

const getAllServices = async (req, res) => {
    const provider = await prisma.provider.findUnique({
        where: {
            auth0_id: res.locals.auth0_id,
        },
    });

    if (provider) {
        const services = await prisma.service.findMany({
            where: {
                id_provider: provider.id,
            },
            include: {
                location: true,
            },
        });

        return res.json(services).end();
    }
};

const getService = async (req, res) => {
    const service = await prisma.service.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
        include: {
            location: true,
            provider: true,
        },
    });
    res.json(service).end();
    return;
};

const ServiceController = { addService, getAllServices, getService };

export default ServiceController;
