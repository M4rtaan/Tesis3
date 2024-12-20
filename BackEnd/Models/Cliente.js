const pool = require('../dbclientes/clientesdb');

class Cliente {
    // Crear un cliente
    static async create(data) {
        const query = `
            INSERT INTO clientes (
                rut, nombre, numero, modelo, 
                año, transmision, combustible, kilometraje, 
                motor, patente
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
            RETURNING *;
        `;
        const values = [
            data.rut, data.nombre, data.numero, data.modelo,
            data.año, data.transmision, data.combustible, data.kilometraje,
            data.motor, data.patente
        ];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    // Encontrar un cliente por RUT
    static async findByRut(rut) {
        const query = `SELECT * FROM clientes WHERE rut = $1;`;
        const { rows } = await pool.query(query, [rut]);
        return rows[0];
    }

    // Obtener todos los clientes
    static async findAll() {
        const query = `
            SELECT 
                rut, nombre, numero, modelo, 
                año, transmision, combustible, kilometraje, 
                motor, patente
            FROM clientes 
            ORDER BY rut ASC;
        `;
        const { rows } = await pool.query(query);
        return rows;
    }

    // Actualizar un cliente por RUT
    static async update(rut, data) {
        const query = `
            UPDATE clientes 
            SET 
                nombre = $1, 
                numero = $2, 
                modelo = $3, 
                año = $4, 
                transmision = $5, 
                combustible = $6, 
                kilometraje = $7, 
                motor = $8, 
                patente = $9 
            WHERE rut = $10 
            RETURNING *;
        `;
        const values = [
            data.nombre, data.numero, data.modelo, 
            data.año, data.transmision, data.combustible, 
            data.kilometraje, data.motor, data.patente, 
            rut
        ];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    // Eliminar un cliente por RUT
    static async delete(rut) {
        const query = `DELETE FROM clientes WHERE rut = $1 RETURNING *;`;
        const { rows } = await pool.query(query, [rut]);
        return rows[0];
    }
}

module.exports = Cliente;
