import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getLocations = async (req, res) => {
    const locations = await prisma.location.findMany();
    
    res.json(locations);
}

const LocationController = { getLocations };

export default LocationController;