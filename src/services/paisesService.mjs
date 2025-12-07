//https://restcountries.com/v3.1/region/america

export const consumirApiExternaDePaises = async () => {
    console.log("En servicios - consumirApiExternaDePaises");
    const response = await fetch("https://restcountries.com/v3.1/region/america");
    let paisesRecibidos = await response.json();
    console.log(paisesRecibidos);
    return paisesRecibidos;
};