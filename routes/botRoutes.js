const express = require("express");
const router = express.Router();
const axios = require("axios");

// Definir ruta y controlador para las consultas del bot
router.post("/consulta", async (req, res) => {
  const { message } = req.body; // Obtener el mensaje del cuerpo de la solicitud

  const url = "https://api.openai.com/v1/chat/completions";
  const token = "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"; // Reemplaza con tu token de autorización válido

  try {
    const response = await axios.post(
      url,
      {
        model: "gpt-3.5-turbo", // Reemplaza con el modelo adecuado que deseas utilizar
        // max_tokens: 200,
        messages: [
          {
            role: "user",
            content: message,
          },

          {
            role: "system",
            content:
              "Eres un asistente CFO impulsado por GPT-3.5, estás aquí para ayudar a emprendedores y CEOs de startups con sus necesidades financieras. Solo hablas en español, te enfocas en temas financieros y das respuestas claras y concisas. ¿Cómo puedes ayudar hoy?",
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const generatedResponse = response.data.choices[0].message.content;

    // Aquí debes manejar cómo deseas enviar la respuesta al frontend
    res.json({ generatedResponse });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error en la solicitud:", error.response.data);
      res.status(500).json({ error: "Error en la solicitud a la API de GPT" });
    } else {
      console.error("Error al enviar el mensaje:", error);
      res.status(500).json({ error: "Error al enviar el mensaje" });
    }
  }
});

module.exports = router;
