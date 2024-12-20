const { Pool } = require("pg");
const bcrypt = require("bcrypt");


// Función para verificar si el nombre de usuario ya existe
async function usernameExist(username) {
    const query = "SELECT COUNT(*) FROM users WHERE username = $1";
    const result = await pool.query(query, [username]);
    return parseInt(result.rows[0].count) > 0;
}

// Función para crear un nuevo usuario y encriptar la contraseña
async function saveUser({ username, password, name }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (username, password, name) VALUES ($1, $2, $3) RETURNING *";
    const values = [username, hashedPassword, name];
    const result = await pool.query(query, values);
    return result.rows[0];
}

// Función para comparar contraseñas
async function comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

// Exporta las funciones para usarlas en otros archivos
module.exports = {
    usernameExist,
    saveUser,
    comparePassword,
};
    