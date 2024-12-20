import axios from "axios";

const BASE_URL = "http://localhost:5000/citas";

export interface Appointment {
    id: number;
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
}

// Obtener todas las citas
export const getAppointments = async (): Promise<Appointment[]> => {
    try {
        const response = await axios.get<Appointment[]>(BASE_URL);
        return response.data;
    } catch (error: any) {
        console.error("Error al obtener citas:", error);
        throw new Error(error.response?.data?.error || "Error al obtener citas. Intente nuevamente.");
    }
};

// Crear una nueva cita
export const createAppointment = async (
    name: string,
    email: string,
    phone: string,
    date: string,
    time: string
): Promise<Appointment> => {
    try {
        const response = await axios.post<Appointment>(`${BASE_URL}/create`, {
            name,
            email,
            phone,
            date,
            time,
        });
        return response.data;
    } catch (error: any) {
        console.error("Error al agendar cita:", error);
        throw new Error(error.response?.data?.error || "Error al agendar cita. Intente nuevamente.");
    }
};


