require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendEmail = async (to, subject, text, html = null) => {
    if (!to || !subject || (!text && !html)) {
        throw new Error("Faltan parámetros requeridos para enviar el correo.");
    }

    try {
        const info = await transporter.sendMail({
            from: `"${process.env.EMAIL_FROM}" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });
        console.log("Correo enviado: %s", info.messageId);
        return { status: "sent", messageId: info.messageId };
    } catch (error) {
        console.error("Error al enviar el correo:", {
            message: error.message,
            stack: error.stack,
        });
        return { status: "failed", error: error.message };
    }
};

module.exports = sendEmail;
