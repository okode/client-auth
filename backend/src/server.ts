import * as express from 'express';
import http from 'http';
import https from 'https';
import fs from 'fs';

// Import WelcomeController from controllers entry point
import { LandingController, AuthenticateController } from './controllers';

// Create a new express application instance
const app: express.Application = express.default();

// The port the express app will listen on
const httpPort = process.env.HTTP_PORT || 3000;
const httpsPort = process.env.HTTPS_PORT || 3443;

const opts = {
    key: fs.readFileSync('server_key.pem'),
    cert: fs.readFileSync('server_cert.pem'),
    requestCert: true,
    rejectUnauthorized: false,
    ca: [ fs.readFileSync('server_cert.pem') ]
};

// Mount the LandingController at the / route
app.use('/', LandingController);

// Mount the AuthenticateController at the /authenticate route
app.use('/authenticate', AuthenticateController);

http.createServer(app).listen(httpPort, () => {
    // Success callback
    console.log(`Listening at http://localhost:${httpPort}/`);
});

https.createServer(app).listen(httpsPort, () => {
    // Success callback
    console.log(`Listening at https://localhost:${httpsPort}/`);
});
