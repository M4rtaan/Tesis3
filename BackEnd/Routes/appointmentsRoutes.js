const express = require("express");
const { createAppointment } = require("../Controllers/appointmentsController");

const router = express.Router();

// Ruta para crear una cita
router.post("/create", async (req, res, next) => {
    try {
        await createAppointment(req, res);
    } catch (error) {
        next(error); // Pasar errores al manejador global
    }
});

module.exports = router;
