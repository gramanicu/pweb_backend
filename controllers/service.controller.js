import prisma from '../prismaClient.js';

const addService = async (req, res) => {
    res.status(200).end();
};

const getAllServices = async (req, res) => {
    res.status(200).end();
};

const getService = async (req, res) => {
    res.status(200).end();
};

const ServiceController = { addService, getAllServices, getService };

export default ServiceController;
