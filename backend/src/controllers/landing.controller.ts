import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (_, res) => {
    res.send('<html><body><a href="authenticate">Log in using client certificate</a></body></html>');
});

export const LandingController = router;