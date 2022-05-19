import prisma from '../prismaClient.js';

const addUser = async (req, res) => {

    try {
        if (req.body.role == 'owner') {
            await prisma.owner.create({
                data: {
                    "email" : req.body.email,
                    "name" : req.body.name,
                    "phone" : req.body.phone,
                    "auth0_id" : "TODO!"
                }
            });
        } else if (req.body.role == 'provider') {
            await prisma.provider.create({
                data: {
                    "email" : req.body.email,
                    "name" : req.body.name,
                    "phone" : req.body.phone,
                    "auth0_id" : "TODO!"
                }
            });
        } else if (req.body.role == 'refugee') {
            // TODO Search dupa country
        } else {
            throw new Error("Bad role!");
        }
    } catch (error) {
        console.log(error);
    }
    res.status(200).end();
};
const getUser = async (req, res) => {
    res.status(200).end();
};

const UserController = { addUser, getUser };

export default UserController;
