import express from 'express';
import {connectDB} from './config/dbConfig.mjs';

import paisesRoutes from './routes/paisesRoutes.mjs';

import expressLayouts from 'express-ejs-layouts';

//para renderizar las vistas
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

//Conexión a MongoDB
connectDB();

/*
*Configurarción del motor de vistas
*/

//ruta absoluta del archivo app.mjs
const __filename = fileURLToPath(import.meta.url);
console.log("filename: ", __filename)

//directorio en que se encuentra el archivo app.mjs
const __dirname = path.dirname(__filename);
console.log("dirname: ", __dirname);

//establece la ruta a carpeta views
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');

//configurar express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout') //archivo base de layout

/*-------------------------------- */

//configuración de rutas
app.use('/api', paisesRoutes);

//Iniciar el servidor
app.listen(PORT, ()=> {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})