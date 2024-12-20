const Joi = require("joi");
const pool = require("../CitasDB/CitasDB");
const sendEmail = require("../utils/email");

exports.createAppointment = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().pattern(/^\d+$/).min(7).max(15).required(),
        date: Joi.string().isoDate().required(),
        time: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { name, email, phone, date, time } = value;

    try {
        const conflictCheckQuery = `
            SELECT * FROM appointments WHERE date = $1 AND time = $2;
        `;
        const conflictCheckValues = [date, time];
        const conflictResult = await pool.query(conflictCheckQuery, conflictCheckValues);

        if (conflictResult.rows.length > 0) {
            return res.status(400).json({ error: "Ya existe una cita agendada para esta fecha y hora." });
        }

        const query = `
            INSERT INTO appointments (name, email, phone, date, time)
            VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `;
        const values = [name, email, phone, date, time];
        const result = await pool.query(query, values);

        const subject = "Confirmación de Cita";
        const text = `
            Estimado/a ${name},
            
            Su cita ha sido agendada exitosamente:
            - Fecha: ${date}
            - Hora: ${time}
            - Teléfono: ${phone}
            
            Gracias por elegir nuestro taller mecánico.
        `;

        try {
            await sendEmail(email, subject, text);
        } catch (emailError) {
            console.error("Error al enviar el correo:", emailError);
            return res.status(201).json({
                message: "Cita agendada exitosamente, pero no se pudo enviar el correo.",
                appointment: result.rows[0],
            });
        }

        res.status(201).json({
            message: "Cita agendada exitosamente y correo enviado.",
            appointment: result.rows[0],
        });
    } catch (error) {
        console.error("Error al agendar cita:", {
            error: error.message,
            stack: error.stack,
            inputs: { name, email, phone, date, time },
        });
        res.status(500).json({ error: "Error interno del servidor." });
    }
};
