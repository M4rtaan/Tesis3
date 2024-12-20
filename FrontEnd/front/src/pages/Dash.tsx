import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider'; // Contexto de autenticación
import '../css/Dashboard.css';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth(); // Obtén el usuario y la función para cerrar sesión

    useEffect(() => {
        // Redirige al login si no hay usuario autenticado
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="user-info">
                    {user ? (
                        <>
                            <p>
                                Bienvenido: <strong>{user.name}</strong>
                            </p>
                            <p>Usuario: {user.username}</p>
                        </>
                    ) : (
                        <p>Cargando usuario...</p>
                    )}
                </div>
                <center>
                    <h1>Bienvenido a tu sistema ERP </h1>
                    </center>
                <button className="logout-button" onClick={logout}>
                    Cerrar Sesión
                </button>
            </header>
            <main className="dashboard-grid">
                <div className="card" onClick={() => handleNavigate('/citas')}>
                    Órdenes de Trabajo
                </div>
                <div className="card" onClick={() => handleNavigate('/notificacion')}>
                    Notificar al cliente
                </div>
                <div className="card" onClick={() => handleNavigate('/clientes')}>
                    Lista de Clientes
                </div>
                <div className="card" onClick={() => handleNavigate('/vehiculos')}>
                    Lista de Vehículos
                </div>
                <div className="card" onClick={() => handleNavigate('/chats')}>
                    Abrir Chat
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
