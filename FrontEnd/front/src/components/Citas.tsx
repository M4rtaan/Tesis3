import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/appointment.css";
import { getAppointments, createAppointment, Appointment } from "../services/appointmentsService";

const AppointmentForm: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const navigate = useNavigate();
    const itemsPerPage = 5;

    // Función para obtener citas
    const fetchAppointments = async () => {
        setIsFetching(true);
        try {
            const data = await getAppointments();
            if (Array.isArray(data)) {
                setAppointments(data);
            } else {
                setResponseMessage("Los datos recibidos no son válidos.");
            }
        } catch (error: any) {
            setResponseMessage(error.response?.data?.message || "Error al obtener citas.");
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    // Validación de campos
    const validateInputs = (): boolean => {
        if (!name.trim() || !email.trim() || !phone.trim() || !date.trim() || !time.trim()) {
            setResponseMessage("Todos los campos son obligatorios.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setResponseMessage("Por favor, ingrese un correo válido.");
            return false;
        }

        if (!/^\d+$/.test(phone) || phone.length < 7 || phone.length > 15) {
            setResponseMessage("El número de teléfono debe contener entre 7 y 15 dígitos numéricos.");
            return false;
        }

        return true;
    };

    // Manejo del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setResponseMessage(null);

        if (!validateInputs()) return;

        setIsLoading(true);

        try {
            const newAppointment = await createAppointment(name, email, phone, date, time);
            setResponseMessage(`Cita agendada exitosamente. ID: ${newAppointment.id}`);
            resetForm();
            fetchAppointments();
        } catch (error: any) {
            setResponseMessage(error.response?.data?.message || "Error al agendar cita.");
        } finally {
            setIsLoading(false);
        }
    };

    // Reiniciar formulario
    const resetForm = () => {
        setName("");
        setEmail("");
        setPhone("");
        setDate("");
        setTime("");
    };

    // Paginación
    const paginatedAppointments = appointments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleNextPage = () => {
        if (currentPage < Math.ceil(appointments.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="appointment-form-container">
            <h1>Agendar Cita</h1>
            <form className="appointment-form" onSubmit={handleSubmit} aria-labelledby="appointment-form">
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Ingrese su nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Ingrese su correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Teléfono</label>
                    <input
                        id="phone"
                        type="text"
                        placeholder="Ingrese su número de teléfono"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Fecha</label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="time">Hora</label>
                    <input
                        id="time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn" disabled={isLoading}>
                    {isLoading ? "Agendando..." : "Agendar"}
                </button>
            </form>
            {responseMessage && <p className="response-message">{responseMessage}</p>}
            <button
                className="back-to-dashboard-btn"
                onClick={() => navigate("/dashboard")}
            >
                Volver al Dashboard
            </button>
            <div className="appointments-list">
                <h2>Lista de Citas</h2>
                {isFetching ? (
                    <p>Cargando citas...</p>
                ) : paginatedAppointments.length > 0 ? (
                    <>
                        <ul>
                            {paginatedAppointments.map((appointment) => (
                                <li key={appointment.id}>
                                    {appointment.name} - {appointment.date} {appointment.time}
                                </li>
                            ))}
                        </ul>
                        <div className="pagination">
                            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                                Anterior
                            </button>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === Math.ceil(appointments.length / itemsPerPage)}
                            >
                                Siguiente
                            </button>
                        </div>
                    </>
                ) : (
                    <p>No hay citas agendadas.</p>
                )}
            </div>
        </div>
    );
};

export default AppointmentForm;
