const Cliente = require('../Models/Cliente');

// Crear un cliente
exports.create = async (req, res) => {
    try {
        const { 
            rut, nombre, numero, modelo, 
            año, transmision, combustible, kilometraje, 
            motor, patente 
        } = req.body;

        const cliente = await Cliente.create({
            rut, nombre, numero, modelo, 
            año, transmision, combustible, kilometraje, 
            motor, patente
        });
        res.status(201).json(cliente);
    } catch (error) {
        if (error.code === "23505") { // Duplicidad en la clave primaria
            return res.status(400).json({ error: "El RUT ya existe en la base de datos." });
        }
        console.error("Error al crear el cliente:", error);
        res.status(500).json({ error: 'Error al crear el cliente' });
    }
};

// Obtener todos los clientes
exports.getAll = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.status(200).json(clientes);
    } catch (error) {
        console.error("Error al obtener los clientes:", error);
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
};

// Obtener un cliente por RUT
exports.getOne = async (req, res) => {
    try {
        const { rut } = req.params;

        const cliente = await Cliente.findByRut(rut);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        res.status(200).json(cliente);
    } catch (error) {
        console.error("Error al obtener el cliente:", error);
        res.status(500).json({ error: 'Error al obtener el cliente' });
    }
};

// Actualizar un cliente
exports.update = async (req, res) => {
    try {
        const { rut } = req.params;
        const { 
            nombre, numero, modelo, 
            año, transmision, combustible, kilometraje, 
            motor, patente
        } = req.body;

        const updatedCliente = await Cliente.update(rut, { 
            nombre, numero, modelo, 
            año, transmision, combustible, kilometraje, 
            motor, patente
        });
        if (!updatedCliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        res.status(200).json(updatedCliente);
    } catch (error) {
        console.error("Error al actualizar el cliente:", error);
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
};

// Eliminar un cliente
exports.delete = async (req, res) => {
    try {
        const { rut } = req.params;

        const deletedCliente = await Cliente.delete(rut);
        if (!deletedCliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        res.status(200).json({ message: 'Cliente eliminado exitosamente' });
    } catch (error) {
        console.error("Error al eliminar el cliente:", error);
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
};
