//Importar el modelo de superheroes
import Pais from '../models/Pais.mjs'; 
//Importar abstracción de los metodos CRUD
import IRepository from './IRepository.mjs';

//Clase PaisRepository que hereda de IRepository
class PaisRepository extends IRepository {
    async obtenerPaisPorId(id){
        //devuelve un superhéroe con el id enviado
        return await Pais.findById(id);
    }

    async obtenerTodosLosPaises(){
        return await Pais.find({});
    }

    async registrarPaisesAPI(listadoPaises){
        console.log("En repository - registrarPaisesAPI");
        const paises = await Pais.create(listadoPaises);
        return paises;
    }

}

export default new PaisRepository();