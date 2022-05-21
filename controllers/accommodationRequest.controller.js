import prisma from '../prismaClient.js';

const getAllAccommodationRequests = async (req, res) => {

    const requests = await prisma.accommodationRequest.findMany();

    res.json(requests);
};

const addAccommodationRequest = async (req, res) => {

    const refugee = await prisma.refugee.findUnique({
        where: {
            auth0_id: res.locals.auth0_id
        }
    })

    const accomodationRequest = await prisma.accomodationRequest.create({
        data: {
            refugee: {
                connect: {
                    id: refugee.id
                }
            }
        },
    });

    // TODO: send email

    // amqp.connect('amqp://localhost', function(error, connection) {
    //     if (error) {
    //         throw error;
    //     }
    //     connection.createChannel(function(error1, channel) {
    //         if (error1) {
    //         throw error1;
    //         }

    //         let queue = 'email_queue';
    //         let msg = `You have a demand for location ${res.id_loc}`;

    //         channel.assertQueue(queue, {
    //         durable: true
    //         });
    //         channel.sendToQueue(queue, Buffer.from(msg), {
    //         persistent: true
    //         });
    //         console.log("Sent '%s'", msg);
    //     });
    //     setTimeout(function() {
    //         connection.close();
    //         process.exit(0)
    //     }, 500);
    // });

    res.json(accomodationRequest);
};

const getAccommodationRequest = async (req, res) => {

    const accomodationRequest = await prisma.accomodationRequest.findFirst({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            location: true,
            refugee: true,
        }
    })

    res.json(accomodationRequest);

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
