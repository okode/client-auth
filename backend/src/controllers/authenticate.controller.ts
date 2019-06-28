import { Router, Request, Response } from 'express';
import { TLSSocket } from 'tls';

const router = Router();

router.get('/', (req, res) => {
    const tlsSocket = req.socket as TLSSocket;
    const cert = tlsSocket.getPeerCertificate();
    if (tlsSocket.authorized) {
        res.send(`Hello ${cert.subject.CN}, your certificate was issued by ${cert.issuer.CN}!`);
    } else if (cert.subject) {
		res.status(403).send(`Sorry ${cert.subject.CN}, certificates from ${cert.issuer.CN} are not welcome here.`);
    } else {
		res.status(401)
		   .send(`Sorry, but you need to provide a client certificate to continue.`);
	}
});

export const AuthenticateController = router;