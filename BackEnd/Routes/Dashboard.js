const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Acceso no autorizado' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ message: 'Bienvenido al Dashboard', user: verified });
    } catch (err) {
        res.status(403).json({ error: 'Token inválido' });
    }
});

module.exports = router;
