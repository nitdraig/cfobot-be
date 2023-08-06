const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const eschema = mongoose.Schema;

const eschemausuario = new eschema({
  nombre: String,
  email: String,
  apellido: String,
  idusuario: String,
});

const ModeloUsuario = mongoose.model("usuarios", eschemausuario);
module.exports = router;

//para Agregar usuarios
router.post("/agregarusuario", (req, res) => {
  const nuevousuario = new ModeloUsuario({
    nombre: req.body.nombre,
    email: req.body.email,
    apellido: req.body.apellido,
    idusuario: req.body.idusuario,
  });

  //actualizado//
  nuevousuario
    .save()
    .then(() => {
      res.send("Usuario agregado correctamente");
    })
    .catch((err) => {
      res.send(err);
    });
});

//actualizado//
router.get("/obtenerusuarios", (req, res) => {
  ModeloUsuario.find({})
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      res.send(err);
    });
});

//obtener data
router.post("/obtenerdatausuario", (req, res) => {
  ModeloUsuario.find({ idusuario: req.body.idusuario })
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      res.send(err);
    });
});

//actualizarUsuario
router.post("/actualizausuario", (req, res) => {
  ModeloUsuario.findOneAndUpdate(
    { idusuario: req.body.idusuario },
    {
      nombre: req.body.nombre,
      email: req.body.email,
      apellido: req.body.apellido,
      idusuario: req.body.idusuario,
    }
  )
    .then(() => {
      res.send("usuario actualizado");
    })
    .catch((err) => {
      res.send(err);
    });
});

//borrar usuario

router.post("/borrarusuario", (req, res) => {
  ModeloUsuario.findOneAndDelete({ idusuario: req.body.idusuario })
    .then(() => {
      res.send("Usuario borrado");
    })
    .catch((err) => {
      res.send(err);
    });
});
