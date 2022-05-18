import prisma from '../prismaClient.js';

const addUser = async (req, res) => {
    res.status(200).end();
};
const getUser = async (req, res) => {
    res.status(200).end();
};

const UserController = { addUser, getUser };

export default UserController;
