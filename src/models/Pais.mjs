import mongoose from "mongoose";

//Esquema pais
const paisSchema = new mongoose.Schema({
    nombreComun: {type: String, required: true},
    nombreOficial: String,
    capital: [String],
    fronteras: [String],
    area: Number,
    poblacion: Number,
    timezones: [String],
    creador: {type: String, default: "RAMIREZ DIAZ VICTOR FRANCISCO"},
    createdAt: {type: Date, default: Date.now}
});

//Modelo pais                Nombre   esquema    colección
const pais = mongoose.model('Pais', paisSchema, 'Grupo-20');
export default pais;