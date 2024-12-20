const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db');

// Ruta para registrar usuarios
router.post('/', async (req, res) => {
    const { username, name, password } = req.body;

    if (!username || !name || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        // Verificar si el usuario ya existe
        const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar nuevo usuario en la base de datos
        await pool.query(
            'INSERT INTO users (username, name, password) VALUES ($1, $2, $3)',
            [username, name, hashedPassword]
        );

        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
