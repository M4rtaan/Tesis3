const fs = require("fs");
const path = require("path");
const openai = require("../Key/OpenAi");
const fileType = require("file-type");
const tesseract = require("tesseract.js");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");

const processFile = async (filePath) => {
    const buffer = fs.readFileSync(filePath);
    const type = await fileType.fromBuffer(buffer);

    if (!type) {
        throw new Error("Tipo de archivo no reconocido");
    }

    let fileContent = "";
    switch (type.mime) {
        case "application/pdf":
            const pdfData = await pdf(buffer);
            fileContent = pdfData.text;
            break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            const docData = await mammoth.extractRawText({ buffer });
            fileContent = docData.value.trim();
            break;
        case "text/plain":
            fileContent = buffer.toString("utf8");
            break;
        default:
            if (type.mime.startsWith("image/")) {
                const ocrResult = await tesseract.recognize(buffer, "eng");
                fileContent = ocrResult.data.text.trim();
            } else {
                throw new Error("Tipo de archivo no soportado");
            }
    }

    return { fileContent, type };
};

exports.handleChat = async (req, res) => {
    const { message } = req.body;
    const file = req.file;

    if (!message && !file) {
        return res.status(400).json({ error: "Se requiere un mensaje o un archivo." });
    }

    try {
        let fileContent = "";
        if (file) {
            const filePath = path.resolve(file.path);
            try {
                const processedFile = await processFile(filePath);
                fileContent = processedFile.fileContent;
            } finally {
                fs.unlinkSync(filePath); // Limpieza
            }
        }

        const messages = [
            {
                role: "system",
                content: "Eres un asistente especializado en mecánica automotriz. Responde exclusivamente preguntas relacionadas con mecánica automotriz basándote en el contenido proporcionado.",
            },
        ];

        if (message) messages.push({ role: "user", content: message });
        if (fileContent) {
            messages.push({
                role: "user",
                content: `Contenido del archivo procesado:\n${fileContent}`,
            });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages,
            temperature: 0.7,
        });

        res.json({ success: true, reply: response.choices[0].message.content });
    } catch (error) {
        console.error("Error al procesar solicitud:", error.message || error);
        res.status(500).json({ error: "Hubo un problema al procesar tu solicitud." });
    }
};



// Controllers/chatController.js