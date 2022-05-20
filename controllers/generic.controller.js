import prisma from '../prismaClient.js';

const getAllCountries = async (req, res) => {
    const countries = await prisma.country.findMany();

    res.json(countries);
};

const getAllLanguages = async (req, res) => {
    const languages = await prisma.language.findMany();

    res.json(languages);
};

const GenericController = { getAllLanguages, getAllCountries };

export default GenericController;
