import prisma from '../prismaClient.js';

const addService = async (req, res) => {

    const provider = await prisma.provider.findUnique({
        where: {
            auth0_id: res.locals.auth0_id
        }
    })

    const service = await prisma.service.create({
        data: {
            id_loc: req.body.id_loc,
            type: req.body.type,
            name: req.body.name,
            description: req.body.description,
            provider: {
                connect: {
                    id: provider.id
                }
            }
        },
    });
    res.json(service);
};

const getAllServices = async (req, res) => {
    const services = await prisma.service.findMany();

    res.json(services);
};

const getService = async (req, res) => {
    // TODO: cauta un serviciu dupa id si returneaza

    const service = await prisma.service.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            location: true,
            provider: true,
        }
    })
    res.json(service);
};

const ServiceController = { addService, getAllServices, getService };

export default ServiceController;
