var express = require('express');
var router = express.Router();
const zonaController = require("../controllers/zona");

router.get("/view-crear", zonaController.viewCrearZona);

router.post("/agregar", zonaController.agregarZona);
router.post("/enlistar", zonaController.enlistarDireccion);
router.delete("/eliminar/:idZona", zonaController.eliminarZona);
router.delete("/eliminar-zonaDireccion/:idZonaDireccion", zonaController.eliminarZonaDireccion);

module.exports = router;