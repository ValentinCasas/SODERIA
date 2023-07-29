var express = require('express');
var router = express.Router();
const direccionController = require("../controllers/direccion");


router.post("/agregar", direccionController.agregarDireccion);
router.delete("/eliminar/:idDireccion", direccionController.eliminarDireccion);

module.exports = router;