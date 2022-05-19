import prisma from '../prismaClient.js';

const addService = async (req, res) => {
    // TODO: verifica rol de provider
    // TODO: providerul adauga un nou serviciu in prisma.service
    res.status(200).end();
};

const getAllServices = async (req, res) => {
    // TODO: returneaza toate serviciile din prisma.service
    res.status(200).end();
};

const getService = async (req, res) => {
    // TODO: cauta un serviciu dupa id si returneaza
    res.status(200).end();
};

const ServiceController = { addService, getAllServices, getService };

export default ServiceController;
