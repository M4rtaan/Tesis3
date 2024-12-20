import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar el hook de navegación
import axios from "axios";
import "../css/email.css";

const EmailForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate(); // Hook para manejar la navegación

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setResponseMessage("");

        try {
            const response = await axios.post("http://localhost:5000/notificacion/send-form", {
                email,
                subject,
                message,
            });

            console.log("Respuesta del servidor:", response); // Útil para depuración
            setResponseMessage(response.data.message || "Correo enviado exitosamente.");
        } catch (error: any) {
            console.error("Error al enviar el correo:", error.response || error);
            setResponseMessage(error.response?.data?.error || "Error al enviar el correo.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToDashboard = () => {
        navigate("/dashboard"); // Navegar al Dashboard
    };

    return (
        <div className="email-form-container">
            <h1>Enviar Correo</h1>
            <form className="email-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Correo</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Ingrese el correo del destinatario gmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Asunto</label>
                    <input
                        id="subject"
                        type="text"
                        placeholder="Ingrese el asunto"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Mensaje</label>
                    <textarea
                        id="message"
                        placeholder="Escriba su mensaje aquí"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="button-group">
                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? "Enviando..." : "Enviar"}
                    </button>
                    <button
                        type="button"
                        className="back-btn"
                        onClick={handleBackToDashboard}
                        disabled={isLoading}
                    >
                        Volver al Dashboard
                    </button>
                </div>
            </form>
            {responseMessage && (
                <p className={`response-message ${isLoading ? "loading" : ""}`}>
                    {responseMessage}
                </p>
            )}
        </div>
    );
};

export default EmailForm;
