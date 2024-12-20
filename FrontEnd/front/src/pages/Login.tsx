import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import "../css/LoginStyles.css"

const Login: React.FC = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const { error: errorMessage } = await response.json();
                throw new Error(errorMessage || "Error al iniciar sesión");
            }

            const data = await response.json();
            login(data.user, data.token, data.refreshToken);
            navigate("/dashboard");
        } catch (err: any) {
            setError(err.message || "Ocurrió un error inesperado.");
        }
    };

    const handleSignup = () => navigate("/signup");

    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className="login-title">Bienvenido de nuevo</h1>
                <p className="login-description">Inicia sesión para continuar</p>
                {error && <div className="alert-error">{error}</div>}
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">
                            Nombre de Usuario
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Escribe tu usuario"
                            value={credentials.username}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Escribe tu contraseña"
                            value={credentials.password}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Iniciar Sesión
                    </button>
                    <button type="button" onClick={handleSignup} className="btn btn-secondary">
                        Crear Usuario
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
