import prisma from "../prismaClient.js";
import {countries, languages} from "../library/constants.js";


async function test() {

    const owner = await prisma.owner.create({
        data: {
            "auth0_id": "1234567890dsajhgfdasgdakdga123",
            "email": "lalala",
            "name": "test",
            "phone": "telefon"
        }
    });


    for (let i = 0; i < 100; i++) {
        await prisma.location.create({
            data: {
                "address": `test${i}`,
                "name": `test${i}`,
                owner: {
                    connect: {
                        id: owner.id
                    }
                }
            }
        });
    }
}

async function constants() {
    const countriesLength = countries.length;
    for ( var i = 0; i < countriesLength; i++) {
        await prisma.country.create({
            data: {
                "name": countries[i]
            }
        });

    }

    const languagesLength = languages.length;
    for (var i = 0; i < languagesLength; i++) {
        await prisma.language.create({
            data: {
                "name": languages[i]
            }
        });
    }
}

constants();