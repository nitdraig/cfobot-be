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
// const express = require("express");
// const router = express.Router();
// const { DiscussServiceClient } = require("@google-ai/generativelanguage");
// const { GoogleAuth } = require("google-auth-library");

// const MODEL_NAME = "models/chat-bison-001";
// const API_KEY = "AIzaSyAKGjgW1VaHdUIsWn6lDxsQpqYWVtsOA6I"; // Reemplaza con tu clave de API válida

// const client = new DiscussServiceClient({
//   authClient: new GoogleAuth().fromAPIKey(API_KEY),
// });

// router.post("/consulta", async (req, res) => {
//   const { message } = req.body; // Obtener el mensaje del cuerpo de la solicitud

//   try {
//     const result = await client.generateMessage({
//       model: MODEL_NAME,
//       temperature: 0.2,
//       maxOutputTokens: 256,
//       prompt: {
//         context:
//           "You are FER, an assistant CFO. You work to  of Excelso. You are here to help entrepreneurs and startup CEOs with their financial needs.\n\nHelp with the following:\n\nAnswer your questions about business finances. If you have any questions about how to manage your company's finances, don't hesitate to ask me.\nI will do my best to give you a clear and concise answer.\nOffer you financial resources. If you need help finding financial information or tools, I can help you find the resources you need.\nConnect with other financial professionals. If you need more specialized advice,\nI can connect you with other financial professionals who can help you.",
//         examples: [
//           {
//             input: {
//               content: "i'm need help with my startup",
//             },
//             output: {
//               content:
//                 "Of course, I can help you with your startup. What exactly do you need help with?\n\nHere are some general tips to help startups succeed:\n\nHave a clear and well-defined idea. What is the problem your startup solves? Who are your clients? How will you differentiate yourself from the competition?\nBuild a solid team.\nSurrounding yourself with talented and committed people is essential to the success of any company.\nCreate a solid business plan. Your business plan should define your objectives, strategies and financial projections.\nManage your finances well.\nIt is important to have a realistic budget and follow a financial plan so you can make informed decisions.\nConnect with your target market. Research your potential customers and understand their needs.\nBe flexible and adaptable. The market is constantly changing, so it is important to be willing to adapt to changes.\nDo not give up. The path of an entrepreneur is difficult, but it is important to never give up.\nIf you can follow these tips, you will be on the right path to startup success.\n\nCan you give me more details about your startup? What stage of development is it in? What are your main challenges?\n\nOnce you know more about your company,\nI will be able to give you more specific advice.",
//             },
//           },
//         ],
//         messages: [{ content: message }],
//       },
//     });

//     const generatedResponse = result[0].candidates[0].content;

//     // Aquí debes manejar cómo deseas enviar la respuesta al frontend
//     res.json({ generatedResponse });
//   } catch (error) {
//     console.error("Error al generar el mensaje:", error);
//     res.status(500).json({ error: "Error al generar el mensaje" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const aiplatform = require("@google-cloud/aiplatform");

// Imports the Google Cloud Prediction service client
const { PredictionServiceClient } = aiplatform.v1;

const clientOptions = {
  apiEndpoint: "us-central1-aiplatform.googleapis.com",
};

const publisher = "google";
const model = "codechat-bison@001";

const predictionServiceClient = new PredictionServiceClient(clientOptions);

router.post("/consulta", async (req, res) => {
  const { message } = req.body; // Obtener el mensaje del cuerpo de la solicitud

  try {
    const prompt = {
      messages: [
        {
          author: "user",
          content: message,
        },
      ],
    };

    const instanceValue = aiplatform.helpers.toValue(prompt);
    const instances = [instanceValue];

    const parameter = {
      temperature: 0.5,
      maxOutputTokens: 1024,
    };
    const parameters = aiplatform.helpers.toValue(parameter);

    const request = {
      endpoint: `projects/YOUR_PROJECT_ID/locations/YOUR_PROJECT_LOCATION/publishers/${publisher}/models/${model}`,
      instances,
      parameters,
    };

    // Predict request
    const [response] = await predictionServiceClient.predict(request);
    const predictions = response.predictions;

    // Maneja las predicciones según sea necesario y envía la respuesta al frontend
    res.json({ predictions });
  } catch (error) {
    console.error("Error al generar el mensaje:", error);
    res.status(500).json({ error: "Error al generar el mensaje" });
  }
});

module.exports = router;
