const { Router } = require('express');
const { 
    getAllPokemonTypes, 
    getPokemonTypeByID, 
    addPokemonType, 
    deletePokemonType, 
    updatePokemonType // Importar el controlador de actualización
} = require('../controllers/pokemons_types');

const pokemonsTypesRouter = Router();

pokemonsTypesRouter.get('/', getAllPokemonTypes);
pokemonsTypesRouter.get('/:id', getPokemonTypeByID);
pokemonsTypesRouter.post('/', addPokemonType);
pokemonsTypesRouter.put('/:id', updatePokemonType); // Nueva ruta para actualizar
pokemonsTypesRouter.delete('/:id', deletePokemonType);

module.exports = {
    pokemonsTypesRouter
};
