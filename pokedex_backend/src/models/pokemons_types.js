// Archivo pokemons_types.js
const pokemonsTypesQueries = {
    getAll: 'SELECT * FROM pokemons_types;', // Cambiar el nombre de la tabla
    getByID: 'SELECT * FROM pokemons_types WHERE id = ?;',
    create: 'INSERT INTO pokemons_types (pokemon_id, type_id) VALUES (?, ?);',
    delete: 'DELETE FROM pokemons_types WHERE id = ?;',
    update: 'UPDATE pokemons_types SET pokemon_id = ?, type_id = ? WHERE id = ?;',
    getByPokemonAndType: 'SELECT * FROM pokemons_types WHERE pokemon_id = ? AND type_id = ?;'
};

module.exports = { pokemonsTypesQueries };
