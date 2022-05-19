import prisma from '../prismaClient.js';

const getAllAccommodationRequests = async (req, res) => {
    // TODO: verifica rolul de owner
    // TODO: intoarce toate accomodation requesturile din prisma.accomodationrequest
    res.status(200).end();
};

const addAccommodationRequest = async (req, res) => {
    // TODO: verifica rol de refugee
    // TODO: adauga un nou accomodationRequest pt o anumita locatie
    // TODO: Se cauta ownerul ce detine acea locatie si primeste mail printr-o coada de mesaje (RabbitMQ sau Redis)
    res.status(200).end();
};

const getAccommodationRequest = async (req, res) => {
    // TODO: Verfica rol de owner sau refugee
    // TODO: intoarce un accomodation-request dupa id
    res.status(200).end();
};

const respondAccommodationRequest = async (req, res) => {
    // TODO: verifica rol de owner
    // TODO: se modifica campul approved pt accomodationRequest
    res.status(200).end();
};

const AccommodationRequestController = {
    addAccommodationRequest,
    getAccommodationRequest,
    respondAccommodationRequest,
    getAllAccommodationRequests,
};

export default AccommodationRequestController;
