import prisma from '../prismaClient.js';

const getAllCountries = async (req, res) => {
    const countries = await prisma.country.findMany();

    res.json(countries).end();
    return;
};

const getCountry = async (req, res) => {
    const country = await prisma.country.findFirst({
        where: {
            id: parseInt(req.params.id),
        },
    });

    res.json(country).end();
    return;
};

const getAllLanguages = async (req, res) => {
    const languages = await prisma.language.findMany();

    res.json(languages).end();
    return;
};

const getLanguage = async (req, res) => {

    const language = await prisma.language.findFirst({
        where: {
            id: parseInt(req.params.id),
        },
    });

    res.json(language).end();
    return;
};

const GenericController = { getAllLanguages, getAllCountries, getLanguage, getCountry };

export default GenericController;
