import prisma from '../prismaClient.js';
import { countries, languages } from '../library/constants.js';

async function constants() {
    const countriesLength = countries.length;
    for (var i = 0; i < countriesLength; i++) {
        await prisma.country.create({
            data: {
                name: countries[i],
            },
        });
    }

    const languagesLength = languages.length;
    for (var i = 0; i < languagesLength; i++) {
        await prisma.language.create({
            data: {
                name: languages[i],
            },
        });
    }
}

constants();
