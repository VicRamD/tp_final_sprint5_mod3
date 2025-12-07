//https://restcountries.com/v3.1/region/america

import PaisRepository from '../repository/PaisRepository.mjs';

export const consumirApiExternaDePaises = async () => {
    console.log("En servicios - consumirApiExternaDePaises");
    const response = await fetch("https://restcountries.com/v3.1/region/america");
    let paisesRecibidos = await response.json();
    console.log(paisesRecibidos);
    return paisesRecibidos;
};

export const registrarPaisesAPI = async (listadoPaises) => {
    console.log("En servicios - registrarPaisesAPI");
    //console.log(listadoPaises);
    return await PaisRepository.registrarPaisesAPI(listadoPaises);
}