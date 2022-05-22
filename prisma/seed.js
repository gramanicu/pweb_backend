import prisma from '../prismaClient.js';
import { countries, languages } from '../library/constants.js';

async function constants() {
    let c = countries.sort((a, b) => a.localeCompare(b));
    let l = languages.sort((a, b) => a.localeCompare(b));

    const countriesLength = c.length;
    for (var i = 0; i < countriesLength; i++) {
        await prisma.country.create({
            data: {
                name: c[i],
            },
        });
    }

    const languagesLength = l.length;
    for (var i = 0; i < languagesLength; i++) {
        await prisma.language.create({
            data: {
                name: l[i],
            },
        });
    }
}

constants();
