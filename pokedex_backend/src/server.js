const express = require('express');
<<<<<<< HEAD
const { pokemonRouter } = require('./routes/pokemon');
const { typeRouter } = require('./routes/type');
const { pokemonsTypesRouter } = require('./routes/pokemons_types');

// Crear clase
=======
const {pokemonRouter} = require('./routes/pokemon');

>>>>>>> 11dba70cfad087699347a70af51cb79772a28823
class Server {
    constructor() {
        this.app = express();
        this.port = 3000;

        this.seeders();
<<<<<<< HEAD
=======

>>>>>>> 11dba70cfad087699347a70af51cb79772a28823
        this.middlewares();
        this.routes();
    }

<<<<<<< HEAD
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
=======
middlewares(){
    this.app.use(express.json());
}

routes(){
    this.app.use('/pokemon', pokemonRouter);
}

seeders(){
    require('./seeds/pokemon').pokemonSeeder();
}

start() {
    this.app.listen(this.port, () => {
        console.log('Servidor corriendo en el puerto' + this.port);
    });
}
}

module. exports = {
    Server
};
>>>>>>> 11dba70cfad087699347a70af51cb79772a28823
