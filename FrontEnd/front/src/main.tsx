import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dash";
import ProtectedRoute from "./pages/ProtectedRoute";
import Chat from "./pages/chat";
import ClienteList from "./pages/ClienteList";
import EditarCliente from "./pages/EditarCliente";
import VehiculoListDetalles from "./pages/vehiculos"; // Importar el componente actualizado
import ClienteForm from "./pages/ClienteForm";
import EditarVehiculo from "./pages/EditarVehiculo"; // Asegúrate de tener este componente
import { AuthProvider } from "./Auth/AuthProvider";
import "./css/index.css";
import NewPage from "./components/Notificacion";
import AppointmentForm from "./components/Citas"


const router = createBrowserRouter([
    {
        path: "/", // Ruta para login
        element: <Login />,
    },
    {
        path: "/signup", // Ruta de registro
        element: <Signup />,
    },
    {
        path: "/notificacion", // Ruta de registro
        element: <NewPage />,
    },
    {
        path: "/citas", // Ruta de registro
        element: <AppointmentForm />,
    },
    {
        path: "/dashboard", // Ruta protegida para el dashboard
        element: <ProtectedRoute />,
        children: [
            {
                path: "", // Página principal del dashboard
                element: <Dashboard />,
            },
        ],
    },
    {
        path: "/clientes", // Ruta protegida para gestión de clientes
        element: <ProtectedRoute />,
        children: [
            {
                path: "", // Página para listar clientes
                element: <ClienteList />,
            },
            {
                path: "nuevo", // Página para agregar cliente
                element: <ClienteForm />,
            },
            {
                path: "editar/:rut", // Página para editar cliente, usando el parámetro "rut"
                element: <EditarCliente />,
            },
            
        ],
    },
    {
        path: "/vehiculos", // Nueva ruta protegida para gestión de vehículos
        element: <ProtectedRoute />,
        children: [
            {
                path: "", // Página principal para listar vehículos
                element: <VehiculoListDetalles />, // Componente actualizado
            },
            {
                path: "editar/:rut", // Página para editar un vehículo usando el parámetro "rut"
                element: <EditarVehiculo />, // Asegúrate de implementar este componente
            },
        ],
    },
    {
        path: "/chats", // Ruta protegida para el chat
        element: <ProtectedRoute />,
        children: [
            {
                path: "", // Página principal del chat
                element: <Chat />,
            },
        ],
    },
    {
        path: "*", // Ruta para manejar páginas no encontradas
        element: (
            <div>
                <h1>Página no encontrada</h1>
                <a href="/">Volver al inicio</a>
            </div>
        ),
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>
);
