const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // Asegúrate de que el path sea correcto
const authenticateToken = require('../Middleware/authMiddleware');
const router = express.Router();

// Ruta de inicio de sesión
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Nombre de usuario y contraseña son obligatorios' });
    }

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }

        const user = result.rows[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({
            token,
            user: { id: user.id, username: user.username, name: user.name },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta protegida para obtener los datos del usuario autenticado
router.get('/me', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT id, username, name FROM users WHERE id = $1', [req.user.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
