import express from 'express';

import {consumirAPIExternaDePaisesController, obtenerTodosLosPaisesController,
    renderizarFormCrearNuevoPaiController, crearNuevoPaisController, renderizarFormEditarPaisController, eliminarPaisPorIDController
} from '../controllers/paisesController.mjs';

const router = express.Router();

router.get('/paises/', obtenerTodosLosPaisesController);
//crear país
router.get('/paises/agregar', renderizarFormCrearNuevoPaiController);
//router.post('/paises/agregar', crearNuevoPaisController);

router.get('/paises/:id/editar', renderizarFormEditarPaisController);

//eliminar país
router.delete('/paises/:id/', eliminarPaisPorIDController);

//Consumir la API
router.get('/externa/datos', consumirAPIExternaDePaisesController);



export default router;
