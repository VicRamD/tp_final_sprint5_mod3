import {consumirApiExternaDePaises} from '../services/paisesService.mjs';
import {mapearPaises} from '../models/mapearDatosApi.mjs';

export const consumirAPIExternaDePaisesController = async (req, res) => {
    try {
        console.log("En controladores - consumirAPIExternaDePaisesController");
        const listaDePaises = await consumirApiExternaDePaises();
        //filtra los que incluyen spa en languages
        const listaFiltrada = listaDePaises.filter(pais =>  'spa' in pais.languages);
        //lista formateada
        const listaFormateada = mapearPaises(listaFiltrada);

        res.status(200).json(listaFormateada);
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al consumir API',
            error: error.message
        });
    }
}