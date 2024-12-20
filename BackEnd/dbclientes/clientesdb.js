const { Pool } = require('pg');

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
    user: 'postgres', // Reemplaza con tu usuario de PostgreSQL
    host: 'localhost', // Cambia si tu base de datos no está en localhost
    database: 'ClientesDB', // Nombre de tu base de datos
    password: '8738', // Contraseña de tu usuario
    port: 5432, // Puerto predeterminado de PostgreSQL
});

// Exportar la conexión
module.exports = pool;
