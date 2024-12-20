import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/chat.css";

const ChatComponent: React.FC = () => {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const navigate = useNavigate();

    const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

    const sendMessage = async () => {
        if (!input.trim() && !file) return;

        setMessages((prev) => [...prev, { role: "user", content: input || "Archivo enviado" }]);
        setInput("");
        setLoading(true);

        const formData = new FormData();
        formData.append("message", input);
        if (file) formData.append("file", file);

        try {
            const response = await axios.post(`${BASE_URL}/api/chats`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: response.data.reply },
            ]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Hubo un error al procesar tu mensaje o archivo." },
            ]);
        } finally {
            setLoading(false);
            discardFile();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        if (selectedFile) {
            setFile(selectedFile);
            if (selectedFile.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = () => setFilePreview(reader.result as string);
                reader.readAsDataURL(selectedFile);
            } else {
                setFilePreview(null);
            }
        }
    };

    const discardFile = () => {
        setFile(null);
        setFilePreview(null);
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                <header className="chat-header">
                    <h1>Asistente Automotriz</h1>
                </header>
                <main className="chat-body">
                    <div className="chat-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`chat-message ${msg.role}`}>
                                <div className="message-bubble">{msg.content}</div>
                            </div>
                        ))}
                        {loading && <div className="chat-message assistant">Escribiendo...</div>}
                    </div>
                </main>
                <footer className="chat-footer">
                    <textarea
                        className="chat-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Escribe tu mensaje..."
                        disabled={loading}
                    />
                    <div className="chat-actions">
                        <label className="file-upload">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="hidden-file-input"
                            />
                            📎 Seleccionar archivo
                        </label>
                        {file && (
                            <div className="file-info">
                                <span className="file-name">{file.name}</span>
                                <button
                                    className="discard-file-button"
                                    onClick={discardFile}
                                    disabled={loading}
                                >
                                    ❌
                                </button>
                            </div>
                        )}
                        {filePreview && (
                            <div className="file-preview">
                                <img src={filePreview} alt="Vista previa del archivo" />
                            </div>
                        )}
                        <button
                            className="send-button"
                            onClick={sendMessage}
                            disabled={loading || (!input.trim() && !file)}
                        >
                            {loading ? "..." : "Enviar"}
                        </button>
                        <button className="back-button" onClick={() => navigate(-1)}>Volver</button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default ChatComponent;