import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getVehiculos, deleteVehiculo, Cliente } from "../services/clienteService";
import "../css/VehiculoListStyles.css";

const VehiculoListDetalles: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehiculos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getVehiculos();
        setClientes(data);
      } catch {
        setError("Error al cargar los vehículos. Intente de nuevo.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchVehiculos();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value.toLowerCase());
  const handleEdit = (rut: string) => navigate(`/vehiculos/editar/${rut}`);
  const handleDelete = async (rut: string) => {
    if (window.confirm("¿Seguro que deseas eliminar este vehículo?")) {
      try {
        await deleteVehiculo(rut);
        setClientes(clientes.filter((c) => c.rut !== rut));
      } catch {
        setError("Error al eliminar el vehículo.");
      }
    }
  };

  const filteredClientes = clientes.filter((c) => c.nombre.toLowerCase().includes(searchTerm));

  return (
    <div className="vehicle-list-wrapper">
      <header className="vehicle-header">
        <h1 className="vehicle-title">Listado de Vehículos</h1>
        <div className="vehicle-controls">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={handleSearch}
            className="vehicle-search-input"
          />
          <button onClick={() => navigate("/dashboard")} className="btn-back">Volver</button>
        </div>
      </header>

      {error && <div className="alert-message error">{error}</div>}

      <div className="vehicle-table-container">
        {isLoading ? (
          <div className="loading-message">Cargando...</div>
        ) : (
          <table className="vehicle-table">
            <thead>
              <tr>
                <th>RUT</th>
                <th>Nombre</th>
                <th>Modelo</th>
                <th>Año</th>
                <th>Transmisión</th>
                <th>Combustible</th>
                <th>Kilometraje</th>
                <th>Motor</th>
                <th>Patente</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.length > 0 ? (
                filteredClientes.map((cliente) => (
                  <tr key={cliente.rut}>
                    <td>{cliente.rut}</td>
                    <td>{cliente.nombre}</td>
                    <td>{cliente.modelo || "N/A"}</td>
                    <td>{cliente.año || "N/A"}</td>
                    <td>{cliente.transmision || "N/A"}</td>
                    <td>{cliente.combustible || "N/A"}</td>
                    <td>{cliente.kilometraje || "N/A"}</td>
                    <td>{cliente.motor || "N/A"}</td>
                    <td>{cliente.patente || "N/A"}</td>
                    <td>
                      <button className="btn-action edit" onClick={() => handleEdit(cliente.rut)}>Editar</button>
                      <button className="btn-action delete" onClick={() => handleDelete(cliente.rut)}>Eliminar</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="no-data-message">No se encontraron vehículos.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default VehiculoListDetalles;