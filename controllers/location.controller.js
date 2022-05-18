import prisma from '../prismaClient.js';

const getAllLocations = async (req, res) => {
    const locations = await prisma.location.findMany();

    res.json(locations);
};

const addLocation = async (req, res) => {
    return;
};

const getLocation = async (req, res) => {
    return;
};

const leaveLocation = async (req, res) => {
    return;
};

const LocationController = { getAllLocations, addLocation, getLocation, leaveLocation };

export default LocationController;
