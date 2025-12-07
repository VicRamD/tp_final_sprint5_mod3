export const mapearPais = (pais) =>{
    console.log("En models - mapearPais");
    console.log("Datos previos al mapeo:", pais);

    let name = pais.name;
    console.log(name);

    let nombreComun = "";
    let nombreOficial = "";
    if('nativeName' in name && 'spa' in name.nativeName){
        //nombre comun
        nombreComun = name.nativeName.spa.common ? name.nativeName.spa.common : name.common;
        //nombre oficial
        nombreOficial = name.nativeName.spa.official ? name.nativeName.spa.official : name.official;
    } else {
        nombreComun = name.common;
        nombreOficial = name.official;
    }
    

    return {
        nombreComun,
        nombreOficial,
        capital: pais.capital,
        fronteras: pais.borders,
        area: pais.area,
        timezones: pais.timezones,
        creador: 'RAMIREZ DIAZ VICTOR FRANCISCO'
    };
}
/*
    area: Number,
    poblacion: Number,
    timezones: [String],
    creador: String,
    createdAt: {type: Date, default: Date.now} */


export const mapearPaises = (paises) => {
    return paises.map(pais => mapearPais(pais));
}