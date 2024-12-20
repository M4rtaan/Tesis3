const sendEmail = require("../utils/email");

exports.sendEmailFromForm = async (req, res) => {
    const { email, subject, message } = req.body;

    if (!email || !message) {
        return res.status(400).json({ error: "El correo y el mensaje son obligatorios." });
    }

    try {
        const status = await sendEmail(email, subject || "Sin asunto", message);
        res.status(200).json({ message: "Correo enviado exitosamente", status });
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        res.status(500).json({ error: "Error al enviar el correo." });
    }
};
