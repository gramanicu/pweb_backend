import prisma from '../prismaClient.js';

const getAllLocations = async (req, res) => {
    const locations = await prisma.location.findMany();

    res.json(locations);
};

const addLocation = async (req, res) => {
    // TODO: verifica rol de OWNER
    // TODO: adauga locatie in prisma.location
    res.status(200).end();
};

const getLocation = async (req, res) => {
    // TODO: selecteaza locatia din prisma.location dupa id
    res.status(200).end();
};

const leaveLocation = async (req, res) => {
    // TODO: verifica rol de refugiat
    // TODO: face update la campul refugee.id_loc din db
    res.status(200).end();
};

const LocationController = { getAllLocations, addLocation, getLocation, leaveLocation };

export default LocationController;
