import { requestStatusTypes } from '@prisma/client';
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

            // TODO - NOTIFIY USER
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
