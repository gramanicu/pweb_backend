import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import router from './routes/main.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';
import checkJwt from './middlewares/checkJwt.middleware.js';
import { auth, claimCheck, claimIncludes } from 'express-oauth2-jwt-bearer';
import amqp from 'amqplib/callback_api.js'

import swaggerUI from 'swagger-ui-express';
import swaggerDoc from './swagger.js';
import auth0Middleware from './middlewares/auth0.middleware.js';

dotenv.config();

if (!process.env.ISSUER_BASE_URL || !process.env.AUDIENCE) {
    throw 'Make sure you have ISSUER_BASE_URL, and AUDIENCE in your .env file';
}

const app = express();
const PORT = parseInt(process.env.PORT);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// app.get('/api/public', function (req, res) {
//     res.json({
//         message: "Hello from a public endpoint! You don't need to be authenticated to see this.",
//     });
// });

// // This route needs authentication
app.get(
    '/api/private',
    checkJwt,
    claimIncludes('permissions', 'create:location', 'view:location'),
    function (req, res) {
        res.json({
            message: 'Hello from a private endpoint! You need to be authenticated to see this.',
        });
    }
);

// amqp.connect('amqp://localhost', function(error, connection) {
//     if (error) {
//         throw error;
//     }
//     connection.createChannel(function(error1, channel) {
//         if (error1) {
//         throw error1;
//         }

//         let queue = 'email_queue';

//         channel.assertQueue(queue, {
//             durable: true
//         });

//     });
//     setTimeout(function() {
//         connection.close();
//         process.exit(0)
//     }, 500);
// });

// amqp.connect('amqp://localhost', function(error0, connection) {
//     if (error0) {
//         throw error0;
//     }
//     connection.createChannel(function(error1, channel) {
//         if (error1) {
//         throw error1;
//         }
//         var queue = 'email_queue';
//         channel.assertQueue(queue, {
//             durable: true
//         });
//         channel.prefetch(1);
        
//         console.log("Waiting for messages in %s", queue);
//         channel.consume(queue, function(msg) {
//         console.log("Received '%s'", msg.content.toString());
//         setTimeout(function() {
//             channel.ack(msg);
//         }, 1000);
//         });
//     });
// });

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use('/', router);
app.use(errorMiddleware);

