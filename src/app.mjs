import express from 'express';
import {connectDB} from './config/dbConfig.mjs';

import paisesRoutes from './routes/paisesRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

//Conexión a MongoDB
connectDB();

//configuración de rutas
app.use('/api', paisesRoutes);

//Iniciar el servidor
app.listen(PORT, ()=> {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})