export const renderizarPais = (pais) =>{
    console.log("En views - renderizarPais");
    console.log("Datos previos:", pais);
    
    let nombre = "";
    if(pais.nombreOficial) {
        nombre = pais.nombreOficial;
    } else {
        nombre = pais.nombreComun;
    }

    return {
        nombre,
        capital: pais.capital,
        paisesFronteras: pais.borders,
        area: pais.area,
        timezones: pais.timezones,
        creador: pais.creador
    };
}

export const renderizarPaises = (paises) => {
    return paises.map(pais => renderizarPais(pais));
}