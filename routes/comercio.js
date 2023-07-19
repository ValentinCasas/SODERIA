var express = require('express');
var router = express.Router();
const comercioController = require("../controllers/comercio");

router.get("/view-crear", comercioController.viewCrearComercios);
router.get("/view-comercios", comercioController.viewComercios);

router.get("/eliminar/:idComercio", comercioController.eliminarComercio);

router.post("/agregar", comercioController.agregarComercio);
router.post("/actualizar", comercioController.actualizarComercios);

module.exports = router;