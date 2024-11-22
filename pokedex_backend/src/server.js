const express = require('express');
const { pokemonRouter } = require('./routes/pokemon');

class Server {
    constructor(){
        this.app = express();
        this.port = 3000;
        this.seeders();
        this.middlewares();
        this.routes();
    }

    seeders() {
        require('./seeds/pokemon').pokemonSeeder();
    }

middlewares(){
    this.app.use(express.json());  
}

    routes(){
        this.app.use('/pokemon', pokemonRouter);
    }

    start(){
        this.app.listen(this.port, () =>{
            console.log('Server is running on port ' + this.port);
        });
    }
    }
    
    module.exports ={
        Server
    };

