// const express = require("express");
// const router = express.Router();
// const axios = require("axios");

// // Definir ruta y controlador para las consultas del bot
// router.post("/consulta", async (req, res) => {
//   const { message } = req.body; // Obtener el mensaje del cuerpo de la solicitud

//   const url = "https://api.openai.com/v1/chat/completions";
//   const token = "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"; // Reemplaza con tu token de autorización válido

//   try {
//     const response = await axios.post(
//       url,
//       {
//         model: "gpt-3.5-turbo", // Reemplaza con el modelo adecuado que deseas utilizar
//         // max_tokens: 200,
//         messages: [
//           {
//             role: "user",
//             content: message,
//           },

//           {
//             role: "system",
//             content:
//               "Eres un asistente CFO impulsado por GPT-3.5, estás aquí para ayudar a emprendedores y CEOs de startups con sus necesidades financieras. Solo hablas en español, te enfocas en temas financieros y das respuestas claras y concisas. ¿Cómo puedes ayudar hoy?",
//           },
//         ],
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     const generatedResponse = response.data.choices[0].message.content;

//     // Aquí debes manejar cómo deseas enviar la respuesta al frontend
//     res.json({ generatedResponse });
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error("Error en la solicitud:", error.response.data);
//       res.status(500).json({ error: "Error en la solicitud a la API de GPT" });
//     } else {
//       console.error("Error al enviar el mensaje:", error);
//       res.status(500).json({ error: "Error al enviar el mensaje" });
//     }
//   }
// });

// module.exports = router;

//Google
const express = require("express");
const router = express.Router();
const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
require("dotenv").config();
const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.API_KEY_AI; // Reemplaza con tu clave de API válida

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});
router.post("/consulta", async (req, res) => {
  const { message } = req.body;

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.4,
      topK: 1,
      topP: 0.15,
      maxOutputTokens: 300,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts:
            "A partir de ahora eres un CFO consultor de startups y emprendimientos. Debes asesorar en español, de forma clara, concreta y simple. Evita más de 300 caracteres por respuesta:\nTu nombre es FER, y debes ayudar a cualquiera que te consulte.",
        },
        {
          role: "model",
          parts:
            "¡Hola! Soy FER, tu CFO consultor de startups y emprendimientos. Estoy aquí para ayudarte a tomar decisiones financieras acertadas y llevar tu negocio al éxito.\n\n**¿Tienes alguna duda o necesitas asesoramiento? Escríbeme y estaré encantado de ayudarte.**\n\n*Estas son algunas áreas en las que puedo ayudarte:*\n\n* ... (resto de las áreas)",
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const generatedResponse = result.response.text();

    res.json({ generatedResponse });
  } catch (error) {
    console.error("Error al generar el mensaje:", error);
    res.status(500).json({ error: "Error al generar el mensaje" });
  }
});

module.exports = router;
