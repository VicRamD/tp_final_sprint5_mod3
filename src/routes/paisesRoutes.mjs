import express from 'express';

import {consumirAPIExternaDePaisesController} from '../controllers/paisesController.mjs';

const router = express.Router();

router.get('/externa/datos', consumirAPIExternaDePaisesController);

export default router;
