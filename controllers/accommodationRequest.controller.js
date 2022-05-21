import prisma from '../prismaClient.js';

const getAllAccommodationRequests = async (req, res) => {

    const requests = await prisma.accommodationRequest.findMany();

    res.json(requests).end();
    return;
};

const addAccommodationRequest = async (req, res) => {

    const refugee = await prisma.refugee.findUnique({
        where: {
            auth0_id: res.locals.auth0_id
        }
    })

    const accomodationRequest = await prisma.accomodationRequest.create({
        data: {
            refugee: {
                connect: {
                    id: refugee.id
                }
            }
        },
    });

    res.json(accomodationRequest).end();
    return;
};

const getAccommodationRequest = async (req, res) => {

    const accomodationRequest = await prisma.accomodationRequest.findFirst({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            location: true,
            refugee: true,
        }
    })

    res.json(accomodationRequest).end();
    return;

};

const respondAccommodationRequest = async (req, res) => {
    const response = await prisma.accommodationRequest.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            approved: req.body.status,
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
