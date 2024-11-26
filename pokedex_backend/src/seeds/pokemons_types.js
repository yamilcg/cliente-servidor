const pool = require("../db/connection");

const pokemonsTypesSeeder = async () => {
    let conn;
    try {
        // Conexión a la base de datos
        conn = await pool.getConnection();

        // Desactivar las restricciones de claves foráneas y vaciar la tabla
        await conn.query('SET FOREIGN_KEY_CHECKS = 0');
        await conn.query('TRUNCATE TABLE pokemons_types');
        await conn.query('SET FOREIGN_KEY_CHECKS = 1');

        // Obtener los Pokémon desde la API
        const pokemonsData = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0').then(res => res.json());

        // Recorrer cada Pokémon
        for (const pokemon of pokemonsData.results) {
            // Obtener información detallada del Pokémon
            const pokemonDetails = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(res => res.json());

            // Recorrer los tipos de cada Pokémon
            for (const type of pokemonDetails.types) {
                // Insertar la relación Pokémon-Tipo en la tabla 'pokemons_types' solo si existen en 'pokemons' y 'types'
                const pokemonIdQuery = await conn.query('SELECT id FROM pokemons WHERE pokemon = ?', [pokemon.name]);
                const typeIdQuery = await conn.query('SELECT id FROM types WHERE type = ?', [type.type.name]);

                if (pokemonIdQuery.length > 0 && typeIdQuery.length > 0) {
                    const pokemonId = pokemonIdQuery[0].id;
                    const typeId = typeIdQuery[0].id;

                    // Insertar la relación solo si no existe previamente (evita duplicados)
                    await conn.query('INSERT IGNORE INTO pokemons_types (pokemon_id, type_id) VALUES (?, ?)', [pokemonId, typeId]);
                }
            }
        }

        console.log('Seeded pokemons_types');
    } catch (error) {
        console.error('Error seeding pokemons_types:', error);
    } finally {
        if (conn) conn.end();
    }
};

module.exports = { pokemonsTypesSeeder };
