const pool = require("../db/connection");

const typesSeeder = async () => {
    let conn;
    try {
        // Conexión a la base de datos
        conn = await pool.getConnection();

        // Desactivar restricciones de claves foráneas y vaciar la tabla
        await conn.query('SET FOREIGN_KEY_CHECKS = 0');
        await conn.query('TRUNCATE TABLE types');
        await conn.query('SET FOREIGN_KEY_CHECKS = 1');

        // Obtener los tipos desde la API
        const typeData = await fetch('https://pokeapi.co/api/v2/type').then(res => res.json());
        const types = typeData.results.map(type => type.name); // Extraer solo los nombres de los tipos

        // Insertar los tipos en la tabla 'types'
        for (const type of types) {
            await conn.query('INSERT INTO types (type) VALUES(?)', [type]);
        }

        console.log('Seeded types');
    } catch (error) {
        console.error('Error seeding types:', error);
    } finally {
        if (conn) conn.end();
    }
};

module.exports = { typesSeeder };
