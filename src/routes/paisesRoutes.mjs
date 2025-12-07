import express from 'express';

import {consumirAPIExternaDePaisesController, obtenerTodosLosPaisesController} from '../controllers/paisesController.mjs';

const router = express.Router();

router.get('/paises/', obtenerTodosLosPaisesController);

//Consumir la API
router.get('/externa/datos', consumirAPIExternaDePaisesController);

export default router;
