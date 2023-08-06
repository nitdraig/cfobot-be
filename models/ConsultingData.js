// const mongoose = require("mongoose");
// const express = require("express");

// const consultingSchema = new mongoose.Schema({
//   consulting: String,

//   // Otros campos aquí
// });

// module.exports = mongoose.model("consulting", consultingSchema);
const mongoose = require("mongoose");

const consultingSchema = new mongoose.Schema({
  consulting: String,
});

module.exports = mongoose.model("Consulting", consultingSchema);
