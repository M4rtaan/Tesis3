import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClienteByRut, updateCliente } from "../services/clienteService";
import "../css/EditarClienteStyles.css"
interface Cliente {
  rut: string;
  nombre: string;
  numero: string;
  modelo: string;
  año: number;
  transmision: string;
  combustible: string;
  kilometraje: number;
  motor: string;
  patente: string;
}

const EditarCliente: React.FC = () => {
  const { rut } = useParams<{ rut: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Cliente>({
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
  });

  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCliente = async () => {
      setIsLoading(true);
      try {
        if (rut) {
          const cliente = await getClienteByRut(rut);
          setFormData({
            rut: cliente.rut || "",
            nombre: cliente.nombre || "",
            numero: cliente.numero || "",
            modelo: cliente.modelo || "",
            año: cliente.año ?? 0,
            transmision: cliente.transmision || "",
            combustible: cliente.combustible || "",
            kilometraje: cliente.kilometraje ?? 0,
            motor: cliente.motor || "",
            patente: cliente.patente || "",
          });
        }
      } catch (error) {
        setAlert({ type: "error", message: "Error al cargar los datos del cliente." });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCliente();
  }, [rut]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "año" || name === "kilometraje" ? Number(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    if (!formData.nombre || !formData.numero || !formData.modelo) {
      setAlert({ type: "error", message: "Por favor, complete todos los campos obligatorios." });
      return;
    }

    setIsLoading(true);
    try {
      if (rut) {
        await updateCliente(rut, formData);
        setAlert({ type: "success", message: "Cliente actualizado exitosamente." });
        setTimeout(() => navigate("/clientes"), 2000);
      }
    } catch (error) {
      setAlert({ type: "error", message: "Error al actualizar el cliente. Inténtelo de nuevo." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="edit-client-container">
      {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
      <h2>Editar Cliente</h2>
      <form onSubmit={handleSubmit} className="edit-client-form">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="form-group">
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input
              type={key === "año" || key === "kilometraje" ? "number" : "text"}
              name={key}
              value={value}
              onChange={handleChange}
              disabled={key === "rut"}
              required
            />
          </div>
        ))}
        <div className="form-actions">
          <button type="submit" className="btn-save" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar Cambios"}
          </button>
          <button type="button" onClick={() => navigate("/clientes")} className="btn-cancel">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarCliente;