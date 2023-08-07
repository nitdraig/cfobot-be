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

app.use(express.json());

// app.post("/register", async (req, res) => {
//   const { username, password, email } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, password: hashedPassword, email });
//     await newUser.save();
//     res.status(200).send("usuario registrado");
//   } catch (error) {
//     res.status(500).send("error al registrar usuario");
//   }
// });

// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   User.findOne({ username }, (err, user) => {
//     if (err) {
//       res.status(500).send("error al validar usuario");
//     } else if (!user) {
//       res.status(500).send("usuario inexistente");
//     } else {
//       user.isCorrectPassword(password, (err, result) => {
//         if (err) {
//           res.status(500).send("error al autenticar");
//         } else if (result) {
//           res.status(200).send("exito al autenticar");
//         } else {
//           res.status(500).send("usuario y/o contraseña incorrecta");
//         }
//       });
//     }
//   });
// });

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
