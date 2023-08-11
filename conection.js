const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://agustin2051:tnsVqW1l9RLbXltK@cfobot.jrtkdgg.mongodb.net/"
);

const objetobd = mongoose.connection;

objetobd.on("connected", () => {
  console.log("conexion correcta a mongo");
});
objetobd.on("error", () => {
  console.log("conexion incorrecta a mongo");
});

module.exports = mongoose;
