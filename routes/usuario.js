var express = require('express');
var router = express.Router();
const usuarioController = require("../controllers/usuario");

router.get("/view-actualizar", usuarioController.viewActualizar);
router.get("/view-crear", usuarioController.viewCrear);

module.exports = router;