import { Router, Request, Response } from 'express';
import { TLSSocket } from 'tls';

const router = Router();

router.get('/', (req, res) => {
    const tlsSocket = req.socket as TLSSocket;
    const cert = tlsSocket.getPeerCertificate();
    if (tlsSocket.authorized) {
        res.send(`<html><body>Hello ${cert.subject.CN}, your certificate was issued by ${cert.issuer.CN}!</body></html>`);
    } else if (cert.subject) {
		  res.status(200).send(`<html><body>Welcome <strong>${cert.subject.CN}</strong>, you are using certificate issued from <strong>${cert.issuer.CN}</strong></body></html>`);
    } else {
		  res.status(401).send(`<html><body>Sorry, but you need to provide a client certificate to continue.</body></html>`);
	}
});

export const AuthenticateController = router;