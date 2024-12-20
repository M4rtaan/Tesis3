import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getClientes, Cliente, deleteCliente } from "../services/clienteService";
import { FaEdit, FaTrashAlt, FaUserPlus, FaArrowLeft } from "react-icons/fa";
import "../css/ClienteList.css";

const ClienteList: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };
    fetchClientes();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(searchTerm)
  );

  const handleEdit = (rut: string) => {
    navigate(`/clientes/editar/${rut}`);
  };

  const handleAddCliente = () => {
    navigate("/clientes/nuevo");
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleDelete = async (rut: string) => {
    const isConfirmed = window.confirm("¿Estás seguro de eliminar este cliente?");
    if (isConfirmed) {
      try {
        await deleteCliente(rut);
        setClientes(clientes.filter((cliente) => cliente.rut !== rut));
      } catch (err) {
        setError("Error al eliminar el cliente");
      }
    }
  };

  return (
    <div className="cliente-list-container">
      <header className="cliente-list-header">
        <h1>Listado de Clientes</h1>
        <div className="cliente-list-actions">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar cliente..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="btn-add" onClick={handleAddCliente}>
            <FaUserPlus /> Agregar Cliente
          </button>
          <button className="btn-back" onClick={handleBack}>
            <FaArrowLeft /> Volver
          </button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}
      {isLoading ? (
        <div className="loading-message">Cargando...</div>
      ) : (
        <table className="cliente-list-table">
          <thead>
            <tr>
              <th>RUT</th>
              <th>Nombre</th>
              <th>Modelo</th>
              <th>Año</th>
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
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(cliente.rut)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(cliente.rut)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="no-data-message">No se encontraron clientes.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClienteList;