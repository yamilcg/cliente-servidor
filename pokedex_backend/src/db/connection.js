const mariadb = require('mariadb');

const config = {
    host: '127.0.0.1',
    user: 'mariadb_user',
<<<<<<< HEAD
    password: 'abc123',
    database: 'pokemondb',
    port: 3306,
    connectionlimit: 10,
}

=======
    password: 'abc123', 
    database: 'pokemondb',
    port: 3306,
    connectionlimit: 10,

}
>>>>>>> 11dba70cfad087699347a70af51cb79772a28823
const pool = mariadb.createPool(config);

module.exports = pool;