import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/SignupStyles.css"; // Archivo CSS actualizado

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({ username: "", name: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("http://localhost:5000/api/signup", formData);

      if (response.status === 201) {
        setSuccess("Usuario creado exitosamente. Redirigiendo al inicio de sesión...");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setError("Hubo un error al crear el usuario.");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Error al crear usuario.");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h1 className="signup-heading">Crear Cuenta</h1>
        {error && <div className="signup-alert signup-error">{error}</div>}
        {success && <div className="signup-alert signup-success">{success}</div>}
        <form onSubmit={handleSignup} className="signup-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Nombre de Usuario</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Escribe tu usuario"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Nombre Completo</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Escribe tu nombre completo"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Escribe tu contraseña"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="btn-primary">Crear Cuenta</button>
        </form>
        <div className="login-redirect">
          <p>¿Ya tienes una cuenta?</p>
          <button onClick={() => navigate("/")} className="btn-secondary">Iniciar Sesión</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
