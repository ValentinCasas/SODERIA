var express = require('express');
var router = express.Router();
const productoController = require("../controllers/producto");

router.get("/", productoController.viewProductos);
router.get("/view-agregar", productoController.viewAgregarProductos);
router.get("/eliminar/:idProducto", productoController.eliminarProducto);

router.post("/actualizar", productoController.actualizarProductos);
router.post("/agregar", productoController.agregarProducto);

module.exports = router;