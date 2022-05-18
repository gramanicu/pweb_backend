import prisma from '../prismaClient.js';

const getAllAccommodationRequests = async (req, res) => {
    res.status(200).end();
};

const addAccommodationRequest = async (req, res) => {
    res.status(200).end();
};

const getAccommodationRequest = async (req, res) => {
    res.status(200).end();
};

const respondAccommodationRequest = async (req, res) => {
    res.status(200).end();
};

const AccommodationRequestController = {
    addAccommodationRequest,
    getAccommodationRequest,
    respondAccommodationRequest,
    getAllAccommodationRequests,
};

export default AccommodationRequestController;
