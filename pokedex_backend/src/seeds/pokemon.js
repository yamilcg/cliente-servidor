const pool = require("../db/connection");

    const pokemonSeeder = async () => {

    let conn;
    try{
        let pokemons = [];
        pokemons = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0/').then(res => res.json());

        conn = await pool.getConnection();

        pokemons.forEach(async pokemon => {
            await conn.query('INSERT INTO pokemons (pokemon) VALUES (?)', [pokemon.name]);  
        });
    }

    catch (error) {
        console.log(error);
    }

    finally{
        if(conn) conn.end();

    }

    console.log(pokemon.results);

}

module.exports = {pokemonSeeder};