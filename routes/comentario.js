var express = require('express');
var router = express.Router();
const comentarioController = require("../controllers/comentario");


router.get("/view-comentarios/:idPublicacion", comentarioController.getComentarios);



module.exports = router;