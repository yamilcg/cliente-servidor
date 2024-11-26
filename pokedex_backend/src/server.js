const express = require('express');
const { pokemonRouter } = require('./routes/pokemon');
const { typeRouter } = require('./routes/type');
const { pokemonsTypesRouter } = require('./routes/pokemons_types');

// Crear clase
class Server {
    constructor() {
        this.app = express();
        this.port = 3000;

        this.seeders();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json()); // Middleware para parsear los cuerpos de las solicitudes JSON
    }

    routes() {
        this.app.use('/pokemon', pokemonRouter);         // Rutas de Pokémon
        this.app.use('/type', typeRouter);               // Rutas de Tipos
        this.app.use('/pokemons_types', pokemonsTypesRouter); // Rutas de Pokémon-Tipos
    }

    seeders() {
        require('./seeds/pokemon').pokemonsSeeder(); // Seeder para Pokémon
        require('./seeds/type').typesSeeder();       // Seeder para Tipos
        require('./seeds/pokemons_types').pokemonsTypesSeeder(); // Seeder para Pokémon-Tipos
    }

    start() {
        this.app.listen(this.port, () => {
            console.log('Server is running on port ' + this.port);
        });
    }
}

module.exports = {
    Server
};
