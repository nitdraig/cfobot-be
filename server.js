const express = require("express");
const cors = require("cors"); // Asegúrate de que cors se importe aquí
const app = express();
const PORT = process.env.PORT || 5000;

// Configura el middleware de CORS antes de definir las rutas
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

const botRoutes = require("./routes/botRoutes");
app.use("/bot", botRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
