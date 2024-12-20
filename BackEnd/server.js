require("dotenv").config(); // Cargar variables de entorno
const express = require('express'); // Importa express
const cors = require("cors"); // Importa CORS
const clienteRoutes = require('./Routes/clienteRoutes'); // Importa las rutas de clientes
const notificationsRoutes = require("./Routes/notificationsRoutes");
const appointmentsRoutes = require("./Routes/appointmentsRoutes");
const router = require("./Routes/Login");
const signup = require("./Routes/Signup");
const chats = require("./Routes/chatRoutes")

const app = express(); // Inicializa la aplicación
const PORT = process.env.PORT || 5000;

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Registrar rutas
app.use('/api/clientes', clienteRoutes);
app.use("/notificacion", notificationsRoutes);
app.use("/citas", appointmentsRoutes);
app.use('/api/login', router);
app.use("/api/signup", signup);
app.use("/api/chats", chats);

    
// Manejador global de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || "Error interno del servidor.",
        },
    });
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
