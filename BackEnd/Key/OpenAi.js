require('dotenv').config();
const { OpenAI } = require('openai');

if (!process.env.OPENAI_API_KEY) {
    throw new Error('La clave de API de OpenAI no está definida. Verifica el archivo .env.');
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
});

module.exports = openai;



// Key/OpenAi.js
