require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/chats', require('./Routes/chatRoutes')); // Ruta unificada para el chat con GPT
app.use('/api/login', require('./Routes/Login'));
app.use('/api/signup', require('./Routes/Signup'));
app.use('/api/dashboard', require('./Routes/Dashboard'));

// Rutas Funcionalidades 
app.use('/api/clientes', require('./Routes/clienteRoutes'));
app.use('/api/vehiculos', require('./Routes/clienteRoutes'));
app.use('/api/citas', require('./Routes/appointmentsRoutes'))

// Manejo de errores globales
app.use((err, req, res, next) => {
    console.error('Error general:', err.message);
    res.status(err.status || 500).json({
        error: err.message || 'Error interno del servidor',
    });
});

module.exports = app; // Exporta la configuración de la aplicación
