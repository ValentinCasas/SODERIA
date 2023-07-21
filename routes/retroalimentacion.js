var express = require('express');
var router = express.Router();
const retroalimentacionController = require("../controllers/retroalimentacion");

router.post("/agregar", retroalimentacionController.agregarRetroalimentacion);
router.get("/view-retroalimentaciones", retroalimentacionController.viewRetroalimentaciones);
router.post("/actualizar", retroalimentacionController.actualizarRetroalimentacion);

router.get("/eliminar/:idRetroalimentacion", retroalimentacionController.eliminarRetroalimentacion);

module.exports = router;