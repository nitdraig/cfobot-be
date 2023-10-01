const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const archivoBD = require("./conection");
const PORT = process.env.PORT || 5000;
const User = require("./models/User"); // Importa el modelo de manera correcta

// Conexion a MongoDB
const mongoose = require("mongoose");
const objetobd = mongoose.connection;
mongoose.connect(
  "mongodb+srv://agustin2051:tnsVqW1l9RLbXltK@cfobot.jrtkdgg.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
objetobd.on("connected", () => {
  console.log("Conexion correcta a MongoDB");
});
objetobd.on("error", () => {
  console.log("Conexion incorrecta a MongoDB");
});

app.use(express.json());

// Configura el middleware de CORS antes de definir las rutas
app.use(
  cors({
    origin: "https://cfobot-fe.vercel.app",
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
