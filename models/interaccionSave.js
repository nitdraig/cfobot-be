const mongoose = require("mongoose");

const interaccionSchema = new mongoose.Schema({
  role: String,
  contentUser: String,
  contentBot: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Interaccion", interaccionSchema);

// //para llamar listas de usuario
// //actualizado//
// router.get("/obtenerusuarios", (req, res) => {
//   Interaccion.find({})
//     .then((docs) => {
//       res.send(docs);
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

// //obtener data
// router.post("/obtenerdatausuario", (req, res) => {
//   Interaccion.find({ idusuario: req.body.idusuario })
//     .then((docs) => {
//       res.send(docs);
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

// //actualizarUsuario
// router.post("/actualizausuario", (req, res) => {
//   Interaccion.findOneAndUpdate(
//     { idusuario: req.body.idusuario },
//     {
//       role: req.body.role,
//       content: req.body.content,
//       apellido: req.body.apellido,
//       idusuario: req.body.idusuario,
//     }
//   )
//     .then(() => {
//       res.send("usuario actualizado");
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

// //borrar usuario

// router.post("/borrarusuario", (req, res) => {
//   Interaccion.findOneAndDelete({ idusuario: req.body.idusuario })
//     .then(() => {
//       res.send("Usuario borrado");
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });
