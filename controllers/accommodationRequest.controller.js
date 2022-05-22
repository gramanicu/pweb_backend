import { requestStatusTypes } from '@prisma/client';
import { enqueueMessage } from '../awqpClient.js';
import prisma from '../prismaClient.js';

const getAllAccommodationRequests = async (req, res) => {
    const requests = await prisma.accommodationRequest.findMany({
        include: {
            location: true,
            refugee: {
                include: {
                    country: true,
                    language: true,
                },
            },
        },
    });

    res.json(requests).end();
    return;
};

const addAccommodationRequest = async (req, res) => {
    if (!req.body.location_id) {
        return res.status(400);
    }

    const refugee = await prisma.refugee.findUnique({
        where: {
            auth0_id: res.locals.auth0_id,
        },
    });

    const accommodationRequest = await prisma.accommodationRequest.create({
        data: {
            location: {
                connect: {
                    id: req.body.location_id,
                },
            },
            refugee: {
                connect: {
                    id: refugee.id,
                },
            },
        },
    });

    if (accommodationRequest) {
        const location = await prisma.location.findUnique({
            where: {
                id: req.body.location_id,
            },
            include: { owner: true },
        });

        if (location) {
            const owner = location.owner;
            const email = owner.email;

            enqueueMessage({
                to: email,
                subject: `New accommodation request`,
                text: `${refugee.name}(${refugee.email}) requests accommodation at ${location.name}`,
            });
        }
    }

    res.json(accommodationRequest).end();
    return;
};

const getAccommodationRequest = async (req, res) => {
    const accommodationRequest = await prisma.accommodationRequest.findFirst({
        where: {
            id: parseInt(req.params.id),
        },
        include: {
            location: true,
            refugee: true,
        },
    });

    res.json(accommodationRequest).end();
    return;
};

const respondAccommodationRequest = async (req, res) => {
    if (req.body.status == requestStatusTypes.ACCEPTED) {
        const accRequest = await prisma.accommodationRequest.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });

        if (accRequest) {
            const refugee = await prisma.refugee.update({
                where: {
                    id: accRequest.id_refugee,
                },
                data: {
                    location: {
                        connect: {
                            id: accRequest.id_location,
                        },
                    },
                },
                include: {
                    accommodationRequests: true,
                },
            });

            refugee.accommodationRequests.forEach(async req => {
                if (req.status == requestStatusTypes.UNANSWERED) {
                    const res = await prisma.accommodationRequest.update({
                        where: {
                            id: req.id,
                        },
                        data: {
                            status: requestStatusTypes.DECLINED,
                        },
                    });
                }
            });

            const location = await prisma.location.findUnique({
                where: {
                    id: accRequest.id_location,
                },
                include: { owner: true },
            });

            if (location) {
                const owner = location.owner;
                const email = refugee.email;

                enqueueMessage({
                    to: email,
                    subject: `Accommodation request accepted`,
                    text: `${owner.name} (${owner.email}), the owner of ${location.name} accepted your accommodation request.`,
                });
            }
        }
    }

    const response = await prisma.accommodationRequest.update({
        where: {
            id: parseInt(req.params.id),
        },
        data: {
            status: req.body.status,
        },
    });

    res.json(response).end();
    return;
};

const AccommodationRequestController = {
    addAccommodationRequest,
    getAccommodationRequest,
    respondAccommodationRequest,
    getAllAccommodationRequests,
};

export default AccommodationRequestController;
