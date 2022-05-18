import prisma from '../prismaClient.js';

const getAllLocations = async (req, res) => {
    const locations = await prisma.location.findMany();

    res.json(locations);
};

const addLocation = async (req, res) => {
    res.status(200).end();
};

const getLocation = async (req, res) => {
    res.status(200).end();
};

const leaveLocation = async (req, res) => {
    res.status(200).end();
};

const LocationController = { getAllLocations, addLocation, getLocation, leaveLocation };

export default LocationController;
