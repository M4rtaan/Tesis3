const BASE_URL = "http://localhost:5000/api/clientes";

// Definición del tipo Cliente
export interface Cliente {
    rut: string;            // Identificador único del cliente
    nombre: string;         // Nombre del cliente
    numero: string;         // Número de contacto
    modelo?: string;        // Modelo del vehículo (opcional en algunos casos)
    año?: number;           // Año del vehículo (opcional en algunos casos)
    transmision?: string;   // Tipo de transmisión
    combustible?: string;   // Tipo de combustible
    kilometraje?: number;   // Kilometraje del vehículo
    motor?: string;         // Tipo de motor
    patente?: string;       // Número de patente
}

// Función para manejar los errores de la API
const handleErrorResponse = async (response: Response) => {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error desconocido");
};

// Crear un cliente
export const createCliente = async (cliente: Cliente): Promise<Cliente> => {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
    });
    if (!response.ok) await handleErrorResponse(response);
    return response.json();
};

// Obtener todos los clientes
export const getClientes = async (): Promise<Cliente[]> => {
    const response = await fetch(BASE_URL);
    if (!response.ok) await handleErrorResponse(response);
    return response.json();
};

// Obtener un cliente por RUT
export const getClienteByRut = async (rut: string): Promise<Cliente> => {
    const response = await fetch(`${BASE_URL}/${rut}`);
    if (!response.ok) await handleErrorResponse(response);
    return response.json();
};

// Actualizar un cliente
export const updateCliente = async (rut: string, cliente: Cliente): Promise<Cliente> => {
    const response = await fetch(`${BASE_URL}/${rut}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
    });
    if (!response.ok) await handleErrorResponse(response);
    return response.json();
};

// Eliminar un cliente
export const deleteCliente = async (rut: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/${rut}`, {
        method: "DELETE",
    });
    if (!response.ok) await handleErrorResponse(response);
};

////////////////////////////////////////////////////////////////

// Crear un Vehiculo
export const createVehiculo = async (Vehiculo: Cliente): Promise<Cliente> => {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Vehiculo),
    });
    if (!response.ok) await handleErrorResponse(response);
    return response.json();
};

// Obtener todos los Vehiculos
export const getVehiculos = async (): Promise<Cliente[]> => {
    const response = await fetch(BASE_URL);
    if (!response.ok) await handleErrorResponse(response);
    return response.json();
};

// Obtener un Vehiculo por RUT
export const getVehiculoByRut = async (rut: string): Promise<Cliente> => {
    const response = await fetch(`${BASE_URL}/${rut}`);
    if (!response.ok) await handleErrorResponse(response);
    return response.json();
};

// Actualizar un Vehiculos
export const updateVehiculo = async (rut: string, Vehiculo: Cliente): Promise<Cliente> => {
    const response = await fetch(`${BASE_URL}/${rut}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Vehiculo),
    });
    if (!response.ok) await handleErrorResponse(response);
    return response.json();
};

// Eliminar un Vehiculo
export const deleteVehiculo = async (rut: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/${rut}`, {
        method: "DELETE",
    });
    if (!response.ok) await handleErrorResponse(response);
};