import { Prisma } from '@prisma/client';
import prisma from '../prismaClient.js';

const addUser = async (req, res) => {
    console.log(req.body);
    try {
        if (req.body.role == 'owner') {
            const owner = await prisma.owner.create({
                data: {
                    email: req.body.email,
                    name: req.body.name,
                    phone: req.body.phone,
                    auth0_id: req.body.auth0_id,
                },
            });

            res.send(owner).end();
        } else if (req.body.role == 'provider') {
            const provider = await prisma.provider.create({
                data: {
                    email: req.body.email,
                    name: req.body.name,
                    phone: req.body.phone,
                    auth0_id: req.body.auth0_id,
                },
            });

            res.send(provider).end();
        } else if (req.body.role == 'refugee') {
            const refugee = await prisma.refugee.create({
                data: {
                    email: req.body.email,
                    name: req.body.name,
                    phone: req.body.phone,
                    auth0_id: req.body.auth0_id,
                    id_language: req.body.id_language,
                    id_country: req.body.id_country,
                    notes: req.body.notes,
                    no_children: req.body.no_children,
                    no_adults: req.body.no_adults,
                },
            });

            res.send(refugee).end();
        } else {
            throw new Error('Bad role!');
        }
    } catch (error) {
        console.log(error);
    }
    res.status(500).end();
};
const getUser = async (req, res) => {
    if (res.locals.auth0_id) {
        try {
            if (res.locals.role == 'owner') {
                const owner = await prisma.owner.findFirst({
                    where: {
                        auth0_id: res.locals.auth0_id,
                    },
                });

                res.send(owner).end();
            } else if (res.locals.role == 'provider') {
                const provider = await prisma.provider.findFirst({
                    where: {
                        auth0_id: res.locals.auth0_id,
                    },
                });

                res.send(provider).end();
            } else if (res.locals.role == 'refugee') {
                const refugee = await prisma.refugee.findFirst({
                    where: {
                        auth0_id: res.locals.auth0_id,
                    },
                });

                res.send(refugee).end();
            }
        } catch (error) {
            console.log(error);
        }
    }
    res.status(500).end();
};

const UserController = { addUser, getUser };

export default UserController;
