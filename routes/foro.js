var express = require('express');
var router = express.Router();
const foroController = require("../controllers/foro");

router.post("/agregar", foroController.agregarPreguntaForo);
router.get("/view-preguntas", foroController.viewPreguntas);
router.post("/actualizar", foroController.actualizarPreguntaForo);

router.get("/eliminar/:idPregunta", foroController.eliminarPregunta);

module.exports = router;