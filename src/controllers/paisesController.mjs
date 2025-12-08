import {consumirApiExternaDePaises, registrarPaisesAPI, obtenerTodosLosPaises,
    obtenerPaisPorId
} from '../services/paisesService.mjs';
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

// Dashboard
export const obtenerTodosLosPaisesController = async (req, res) => {
    console.log("en controlador - obtenerTodosLosPaisesController");
    try {
        const paises = await obtenerTodosLosPaises();
        const paisesFormateados = renderizarPaises(paises);

        res.render('dashboard', {titulo: 'Listado de Países', paises: paisesFormateados});
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al obtener los países',
            error: error.message
        });
    }
    
}

/**
 *  Crear nuevo país
 */

export const renderizarFormCrearNuevoPaiController = (req, res) => {
    console.log("en controlador - renderizarFormCrearNuevoPaiController");
    res.render('addPais', {titulo: 'Nuevo País'});
}

export const crearNuevoPaisController = async (req, res) => {
    console.log("en controlador - crearNuevoPaisController");
    try {
        console.log("aqui");
    } catch(error){
        res.status(500).send({
            mensaje: 'Error en la creación de un nuevo país',
            error: error.message
        });
    }
}

/*--------------------------*/

/**
 *  Editar un país
 */

export const renderizarFormEditarPaisController = async (req, res) => {
    
    try {
        console.log("en controlador - renderizarFormEditarPaisController");
        const {id} = req.params;
        //console.log(id);
        const pais = await obtenerPaisPorId(id); 
        console.log(pais);
        if(!pais){
            return res.status(404).send({mensaje: 'Pais no encontrado'});
        }    

        res.render('editPais', {pais, titulo: 'Editar Pais'});
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al buscar país',
            error: error.message
        });
    }
}

/*--------------------------*/