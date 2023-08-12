const express = require("express");
const router = express.Router();
const Interaccion = require("../models/interaccionSave"); // Importa el modelo

router.post("/nuevainteraccion", (req, res) => {
  const nuevainteraccion = new Interaccion({
    role: req.body.role,
    contentUser: req.body.contentUser,
    contentBot: req.body.contentBot,
  });

  nuevainteraccion
    .save()
    .then(() => {
      res.send("Interacción agregada correctamente");
    })
    .catch((err) => {
      res.send(err);
    });
});
router.get("/interacciones", (req, res) => {
  Interaccion.find()
    .then((interacciones) => {
      res.json(interacciones);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
