var express = require('express');
var router = express.Router();
const comentarioController = require("../controllers/comentario");


router.get("/view-comentarios/:idPublicacion", comentarioController.getComentarios);
router.get("/eliminar/:idComentario", comentarioController.eliminarComentario);
router.post("/crear", comentarioController.crearComentario);



module.exports = router;