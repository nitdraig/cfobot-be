const mongoose = require("mongoose");

const interaccionSchema = new mongoose.Schema({
  role: String, // Puede ser 'user' o 'bot'
  content: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Interaccion = mongoose.model("Interaccion", interaccionSchema);

module.exports = Interaccion;
