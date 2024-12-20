const pool = require('../db');

const createUsersTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

    try {
        await pool.query(query);
        console.log('Tabla "users" creada o ya existe.');
    } catch (err) {
        console.error('Error al crear la tabla "users":', err.message);
        throw err; // Lanza el error para manejarlo en otros niveles
    }
};

module.exports = createUsersTable;
