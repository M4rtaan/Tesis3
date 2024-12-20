import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCliente, Cliente } from "../services/clienteService";
import "../css/ClienteForm.css";

const ClienteForm: React.FC = () => {
  const initialState: Cliente = {
    rut: "",
    nombre: "",
    numero: "",
    modelo: "",
    año: 0,
    transmision: "",
    combustible: "",
    kilometraje: 0,
    motor: "",
    patente: "",
  };

  const [formData, setFormData] = useState<Cliente>(initialState);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    // Validar campos antes de enviar
    if (formData.rut === "" || formData.nombre === "") {
      setAlert({ type: "error", message: "RUT y nombre son obligatorios." });
      return;
    }

    try {
      await createCliente(formData);
      setAlert({ type: "success", message: "Cliente creado exitosamente." });
      setTimeout(() => navigate("/clientes"), 2000); // Redirigir después de 2 segundos
      setFormData(initialState);
    } catch (error) {
      setAlert({ type: "error", message: "Error al crear el cliente. Inténtelo de nuevo." });
    }
  };

  const inputFields = [
    { name: "rut", type: "text", placeholder: "Ingrese el RUT" },
    { name: "nombre", type: "text", placeholder: "Ingrese el nombre" },
    { name: "numero", type: "text", placeholder: "Ingrese el número de teléfono" },
    { name: "modelo", type: "text", placeholder: "Ingrese el modelo del vehículo" },
    { name: "año", type: "number", placeholder: "Ingrese el año del vehículo" },
    { name: "transmision", type: "text", placeholder: "Ingrese el tipo de transmisión" },
    { name: "combustible", type: "text", placeholder: "Ingrese el tipo de combustible" },
    { name: "kilometraje", type: "number", placeholder: "Ingrese el kilometraje" },
    { name: "motor", type: "text", placeholder: "Ingrese el tipo de motor" },
    { name: "patente", type: "text", placeholder: "Ingrese la patente" },
  ];

  return (
    <div className="form-container">
      {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
      <h2 className="form-title">Agregar Cliente</h2>
      <form onSubmit={handleSubmit} className="form">
        {inputFields.map((field) => (
          <div className="form-group" key={field.name}>
            <label htmlFor={field.name}>{field.name.charAt(0).toUpperCase() + field.name.slice(1)}</label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={(formData as any)[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
            />
          </div>
        ))}
        <div className="form-buttons">
          <button type="submit" className="form-submit">
            Guardar
          </button>
          <button type="button" className="form-cancel" onClick={() => navigate("/clientes")}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClienteForm;
