import prisma from '../prismaClient.js';
import { countries, languages } from '../library/constants.js';

async function constants() {
    const cs = await prisma.country.findMany();
    if (cs.length == 0) {
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

        console.log('Seeded db');
    } else {
        console.log('Nothing to add');
    }
}

constants();
