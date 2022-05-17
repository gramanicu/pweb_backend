import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import router from './routes/router.routes.js';
// import { auth, claimCheck, claimIncludes } from 'express-oauth2-jwt-bearer';

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
// app.get(
//     '/api/private',
//     checkJwt,
//     claimIncludes('permissions', 'create:location', 'view:location'),
//     function (req, res) {
//         res.json({
//             message: 'Hello from a private endpoint! You need to be authenticated to see this.',
//         });
//     }
// );
