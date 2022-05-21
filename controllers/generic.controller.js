import prisma from '../prismaClient.js';

const getAllCountries = async (req, res) => {
    const countries = await prisma.country.findMany();

    res.json(countries);
};

const getCountry = async (req, res) => {
    const country = await prisma.country.findFirst({
        where: {
            id: parseInt(req.params.id),
        },
    });

    res.json(country);
};

const getAllLanguages = async (req, res) => {
    const languages = await prisma.language.findMany();

    res.json(languages);
};

const getLanguage = async (req, res) => {

    const language = await prisma.language.findFirst({
        where: {
            id: parseInt(req.params.id),
        },
    });

    res.json(language);
};

const GenericController = { getAllLanguages, getAllCountries, getLanguage, getCountry };

export default GenericController;
