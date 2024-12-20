import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dash";
import Chat from "./pages/chat";
import ClienteList from "./pages/ClienteList";
import ClienteForm from "./pages/ClienteForm";
import EditarCliente from "./pages/EditarCliente";
import ProtectedRoute from "./pages/ProtectedRoute";
import VehiculoListDetalles from "./pages/vehiculos"; // Componente actualizado
import EditarVehiculo from "./pages/EditarVehiculo"; // Asegúrate de implementar este componente
import Newpage from "./components/Notificacion";
import AppointmentForm from "./components/Citas"



const App: React.FC = () => {
    const isAuthenticated = !!localStorage.getItem("authToken");

    return (
        <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />} />
            <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" replace />} />

            {/* Rutas protegidas */}
            <Route path="/dashboard" element={<ProtectedRoute />}>
                <Route path="" element={<Dashboard />} />
                <Route path="clientes" element={<ClienteList />} />
                <Route path="clientes/nuevo" element={<ClienteForm />} />
                <Route path="clientes/editar/:rut" element={<EditarCliente />} />

                <Route path="notificacion" element={<Newpage />} />
                <Route path="citas" element={<AppointmentForm />} />

                {/* Rutas para vehículos */}
                <Route path="vehiculos" element={<VehiculoListDetalles />} />
                <Route path="vehiculos/editar/:rut" element={<EditarVehiculo />} />
            </Route>

            {/* Chat protegido */}
            <Route path="/chats" element={<ProtectedRoute />}>
                <Route path="" element={<Chat />} />
            </Route>

            {/* Ruta por defecto */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default App;
