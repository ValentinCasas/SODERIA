var express = require('express');
var router = express.Router();
const usuarioController = require("../controllers/usuario");

router.get("/view-actualizar", usuarioController.viewActualizar);
router.get("/view-crear", usuarioController.viewCrear);
router.get("/view-perfil", usuarioController.viewPerfil);
router.get("/view-editar-perfil", usuarioController.viewEditarPerfil);

router.get("/eliminar/:idUsuario", usuarioController.eliminarUsuario);
router.post("/agregar", usuarioController.agregarUsuario);
router.post("/actualizar", usuarioController.actualizarUsuarios);
router.post("/actualizar-perfil", usuarioController.actualizarPerfil);

module.exports = router;