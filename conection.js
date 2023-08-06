const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/cfo-db");

const objetobd = mongoose.connection;

objetobd.on("connected", () => {
  console.log("conexion correcta a mongo");
});
objetobd.on("error", () => {
  console.log("conexion incorrecta a mongo");
});

module.exports = mongoose;
