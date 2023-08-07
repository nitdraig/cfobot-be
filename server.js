const express = require("express");
const cors = require("cors");
const app = express();
const archivoBD = require("./conection");
const PORT = process.env.PORT || 5000;

// Conexion a MongoDB
const mongoose = require("mongoose");
const objetobd = mongoose.connection;
mongoose.connect("mongodb://127.0.0.1:27017/cfo-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
objetobd.on("connected", () => {
  console.log("Conexion correcta a MongoDB");
});
objetobd.on("error", () => {
  console.log("Conexion incorrecta a MongoDB");
});

// Configura el middleware de CORS antes de definir las rutas
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

// Importa y usa las rutas para interacciones y bot
const interaccionRoutes = require("./routes/interaccionRoutes");
app.use("/interacciones", interaccionRoutes);

const botRoutes = require("./routes/botRoutes");
app.use("/bot", botRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
