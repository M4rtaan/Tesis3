import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVehiculoByRut, updateVehiculo, Cliente } from "../services/clienteService";
import "../css/EditarVehiculoStyles.css";

const EditarVehiculo: React.FC = () => {
  const { rut } = useParams<{ rut: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Cliente>>({});
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fields = [
    { name: "nombre", label: "Nombre", type: "text", placeholder: "Ingrese el nombre del cliente" },
    { name: "numero", label: "Número de Teléfono", type: "text", placeholder: "Ingrese el número de teléfono" },
    { name: "modelo", label: "Modelo del Vehículo", type: "text", placeholder: "Ingrese el modelo del vehículo" },
    { name: "año", label: "Año del Vehículo", type: "number", placeholder: "Ingrese el año del vehículo" },
    { name: "transmision", label: "Transmisión", type: "text", placeholder: "Ingrese el tipo de transmisión" },
    { name: "combustible", label: "Combustible", type: "text", placeholder: "Ingrese el tipo de combustible" },
    { name: "kilometraje", label: "Kilometraje", type: "number", placeholder: "Ingrese el kilometraje" },
    { name: "motor", label: "Motor", type: "text", placeholder: "Ingrese el tipo de motor" },
    { name: "patente", label: "Patente", type: "text", placeholder: "Ingrese la patente del vehículo" },
  ];

  useEffect(() => {
    const fetchVehiculo = async () => {
      try {
        if (rut) {
          const cliente = await getVehiculoByRut(rut);
          setFormData(cliente || {});
        }
      } catch {
        setAlert({ type: "error", message: "Error al cargar los datos del vehículo." });
      }
    };
    fetchVehiculo();
  }, [rut]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    try {
      if (rut) {
        await updateVehiculo(rut, formData as Cliente);
        setAlert({ type: "success", message: "Vehículo actualizado exitosamente." });
        setTimeout(() => navigate("/vehiculos"), 2000);
      }
    } catch {
      setAlert({ type: "error", message: "Error al actualizar el vehículo. Inténtelo nuevamente." });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "año" || name === "kilometraje" ? Number(value) || 0 : value,
    }));
  };

  return (
    <div className="edit-vehicle-wrapper">
      {alert && <div className={`alert ${alert.type}`}>{alert.message}</div>}
      <h2 className="edit-vehicle-title">Editar Vehículo</h2>
      <form onSubmit={handleSubmit} className="edit-vehicle-form">
        <div className="form-group">
          <label htmlFor="rut" className="form-label">RUT</label>
          <input
            type="text"
            id="rut"
            name="rut"
            value={formData.rut || ""}
            disabled
            className="form-input"
            placeholder="RUT del cliente"
          />
        </div>
        {fields.map(({ name, label, type, placeholder }) => (
          <div key={name} className="form-group">
            <label htmlFor={name} className="form-label">{label}</label>
            <input
              type={type}
              id={name}
              name={name}
              value={formData[name as keyof Cliente] || ""}
              onChange={handleChange}
              className="form-input"
              placeholder={placeholder}
              required
            />
          </div>
        ))}
        <div className="form-actions">
          <button type="submit" className="btn-save">Guardar Cambios</button>
          <button type="button" onClick={() => navigate("/vehiculos")} className="btn-cancel">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditarVehiculo;
