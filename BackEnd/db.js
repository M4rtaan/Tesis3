const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    max: 10, // Máximo de conexiones en el pool
    idleTimeoutMillis: 30000, // Tiempo de espera antes de cerrar una conexión inactiva
    connectionTimeoutMillis: 2000, // Tiempo máximo para intentar conectar
});

pool.on('connect', () => {
    console.log('Conexión establecida con la base de datos');
});

pool.on('error', (err) => {
    console.error('Error en la base de datos:', err.message);
});

module.exports = pool;
