//https://restcountries.com/v3.1/region/america

export const consumirApiExternaDePaises = async () => {
    console.log("En servicios - consumirApiExternaDePaises");
    return await fetch("https://restcountries.com/v3.1/region/america");;
};