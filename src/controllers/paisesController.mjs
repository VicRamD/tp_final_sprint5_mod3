import {consumirApiExternaDePaises} from '../services/paisesService.mjs';

export const consumirAPIExternaDePaisesController = async (req, res) => {
    try {
        console.log("En controladores - consumirAPIExternaDePaisesController");
        let response = await consumirApiExternaDePaises();
        let paisesRecibidos = await response.json();
        console.log(paisesRecibidos);

        console.log("Pasaste por aquí");

        res.status(200).json(paisesRecibidos);
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al consumir API',
            error: error.message
        });
    }
}