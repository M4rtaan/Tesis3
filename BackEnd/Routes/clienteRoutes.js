const express = require('express');
const clienteController = require('../Controllers/clienteController');
const router = express.Router();

// Validar datos del cliente
const validateClienteData = (req, res, next) => {
    const { 
        rut, nombre, numero, modelo, 
        año, transmision, combustible, kilometraje, 
        motor, patente 
    } = req.body;

    if (
        !rut || !nombre || !numero || !modelo ||
        !año || !transmision || !combustible || 
        kilometraje === undefined || !motor || !patente
    ) {
        return res.status(400).json({
            error: 'Faltan campos requeridos: rut, nombre, numero, modelo, año, transmision, combustible, kilometraje, motor o patente.'
        });
    }
    next();
};

// Rutas
router.post('/', validateClienteData, clienteController.create);      // Crear un cliente
router.get('/', clienteController.getAll);                            // Obtener todos los clientes
router.get('/:rut', clienteController.getOne);                        // Obtener un cliente por RUT
router.put('/:rut', validateClienteData, clienteController.update);   // Actualizar un cliente
router.delete('/:rut', clienteController.delete);                     // Eliminar un cliente

module.exports = router;
