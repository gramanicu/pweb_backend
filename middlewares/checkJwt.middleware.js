import express from 'express';
import { auth, claimCheck, claimIncludes } from 'express-oauth2-jwt-bearer';
import * as dotenv from 'dotenv';

dotenv.config('../.env');

const checkJwt = auth({
    audience: process.env.AUDIENCE,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
});

export default checkJwt;
