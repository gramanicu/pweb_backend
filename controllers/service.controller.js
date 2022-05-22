import prisma from '../prismaClient.js';
import { parseServiceType } from '../library/helpers.js';
import { enqueueMessage } from '../awqpClient.js';

const addService = async (req, res) => {
    const provider = await prisma.provider.findUnique({
        where: {
            auth0_id: res.locals.auth0_id,
        },
    });

    const location = await prisma.location.findUnique({
        where: {
            id: req.body.id_loc,
        },
        include: {
            owner: true,
            refugees: true,
            services: true,
        },
    });

    const ok = !location.services.find(s => {
        return s.type == req.body.type;
    });

    if (ok) {
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

        if (location) {
            const owner = location.owner;
            const refugees = location.refugees;
            const email = owner.email;

            enqueueMessage({
                to: email,
                subject: `New service at your location`,
                text: `${location.name} now has ${parseServiceType(service.type)} services`,
            });

            for (const refugee of refugees) {
                enqueueMessage({
                    to: refugee.email,
                    subject: `New service at your location`,
                    text: `${location.name} now has ${parseServiceType(service.type)} services`,
                });
            }
        }
        return res.json(service).end();
    } else {
        return res.status(400).end();
    }
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
