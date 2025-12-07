import {consumirApiExternaDePaises, registrarPaisesAPI, obtenerTodosLosPaises} from '../services/paisesService.mjs';
import {mapearPaises} from '../models/mapearDatosApi.mjs';
import {renderizarPaises} from '../views/responsiveView.mjs';

export const consumirAPIExternaDePaisesController = async (req, res) => {
    try {
        console.log("En controladores - consumirAPIExternaDePaisesController");
        const listaDePaises = await consumirApiExternaDePaises();
        //filtra los que incluyen spa en languages
        const listaFiltrada = listaDePaises.filter(pais =>  'spa' in pais.languages);
        //lista formateada
        const listaFormateada = mapearPaises(listaFiltrada);

        //registrar en la BD
        const paisesRegistrados = await registrarPaisesAPI(listaFormateada);
        res.status(200).json(paisesRegistrados);
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al consumir API',
            error: error.message
        });
    }
}

export const obtenerTodosLosPaisesController = async (req, res) => {
    console.log("en controlador - obtenerTodosLosPaisesController");
    const paises = await obtenerTodosLosPaises();
    const paisesFormateados = renderizarPaises(paises);

    res.render('dashboard', {titulo: 'Listado de Países', paises: paisesFormateados});
}