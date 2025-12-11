import {validationResult} from 'express-validator';

import {consumirApiExternaDePaises, registrarPaisesAPI, obtenerTodosLosPaises,
    obtenerPaisPorId, crearNuevoPais, actualizarPais, eliminarPaisPorID
} from '../services/paisesService.mjs';
import {mapearPaises} from '../models/mapearDatosApi.mjs';
import {renderizarPaises} from '../views/responsiveView.mjs';

export const renderizarLandingPage = (req, res) => {
    res.render('home', {titulo: "Países de Hispanoamérica"});
}

export const renderizarAbout = (req, res) => {
    res.render('about', {titulo: "Acerca De"});
}

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
    res.render('addPais', {titulo: 'Nuevo País', camposErroneos: [], mensajesDeError: []});
}

export const crearNuevoPaisController = async (req, res) => {
    console.log("en controlador - crearNuevoPaisController");
    try {
        console.log("body", req.body);
        const datos = req.body;
        console.log(datos);
        const datosPais = {
            nombreComun: datos.nombreComunPais,
            nombreOficial: datos.nombreOficialPais,
            capital: datos.capitalPais,
            fronteras: datos.paisesFrontera,
            area: datos.areaPais,
            poblacion: datos.poblacionPais,
            timezones: datos.timezones ? datos.timezones : [],
        };
        console.log(datosPais);

        const paisCreado = await crearNuevoPais(datosPais);
        console.log(paisCreado);
        
        res.redirect('/api/paises');
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
    console.log("en controlador - renderizarFormEditarPaisController");
    try {
        const {id} = req.params;
        //console.log(id);
        const pais = await obtenerPaisPorId(id); 
        console.log(pais);
        if(!pais){
            return res.status(404).send({mensaje: 'Pais no encontrado'});
        }    

        res.render('editPais', {valoresRetornados: pais, titulo: 'Editar Pais', camposErroneos: [], mensajesDeError: []});
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al buscar país',
            error: error.message
        });
    }
}

export const actualizarPaisController = async (req, res) => {
    console.log("en controlador - actualizarPaisController");
    try {
        const {id} = req.params;

        console.log(req.body);
        const datos = req.body;
        const datosPais = {
            nombreComun: datos.nombreComunPais,
            nombreOficial: datos.nombreOficialPais,
            capital: datos.capitalPais,
            fronteras: datos.paisesFrontera,
            area: datos.areaPais,
            poblacion: datos.poblacionPais,
            timezones: datos.timezones ? datos.timezones : [],
        };
        console.log(datosPais);

        const paisActualizado = await actualizarPais(id, datosPais);
        console.log("Actualizar país", paisActualizado);

        if(!paisActualizado){
            return res.status(404).send({mensaje: 'País no encontrado'});
        }  

        res.redirect('/api/paises');

    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al actualizar un país',
            error: error.message
        });
    }
}  

/*--------------------------*/

/**
 *  Eliminar un país
 */

export const eliminarPaisPorIDController = async (req, res) => {
    try {
        const {id} = req.params;
        console.log("en controlador - eliminarPaisPorIDController");
        //console.log(id);

        const paisEliminado = await eliminarPaisPorID(id);
        console.log("País Eliminado", paisEliminado);

        if(!paisEliminado){
            return res.status(404).send({mensaje: 'País no encontrado'});
        }  

        res.redirect('/api/paises');

    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al eliminar un país',
            error: error.message
        });
    }
}

/*--------------------------*/