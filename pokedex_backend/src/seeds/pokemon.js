const pool = require("../db/connection")

const pokemonsSeeder = async ()=> {
   let conn
   try{
        let pokemons = []
        pokemons = await  fetch('https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0').then(res=>res.json())

        conn = await pool.getConnection()

        await conn.query('SET FOREIGN_KEY_CHECKS = 0')
        await conn.query('TRUNCATE TABLE pokemons')
        await conn.query('SET FOREIGN_KEY_CHECKS = 1')

        pokemons.results.forEach(async(pokemon)=>{
            await conn.query('INSERT INTO pokemons (pokemon) VALUES(?)',[pokemon.name])
        })
        console.log('Seeded pokemons')

/** ================== BLOQUE 2: INSERTAR TIPOS ================== */
// Desactivar las restricciones de clave externa, vaciar las tablas y luego volver a activarlas
    await conn.query('SET FOREIGN_KEY_CHECKS = 0');
    await conn.query('TRUNCATE TABLE types'); // Vaciar la tabla types
    await conn.query('SET FOREIGN_KEY_CHECKS = 1');

    // Insertar tipos en la tabla 'types'
    let types = new Set(); // Usamos un Set para evitar duplicados

    for (const pokemon of pokemons.results) {
      // Obtener información detallada de cada Pokémon
      const pokemonDetails = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(res => res.json());

      // Extraer los tipos de cada Pokémon y agregar al Set
      pokemonDetails.types.forEach(type => { types.add(type.type.name); // Agregar solo el nombre del tipo
      });
    }

    // Insertar los tipos únicos en la tabla 'types'
    for (const type of types) {
      await conn.query('INSERT INTO types (type) VALUES(?)', [type]);
    }

    console.log('Seeded types');
    

        

   }catch(error){
    console.log(error)
   }finally{
    if(conn)conn.end()
   }




    
}

module.exports = {pokemonsSeeder}