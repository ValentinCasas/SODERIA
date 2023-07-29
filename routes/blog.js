var express = require('express');
var router = express.Router();
const blogController = require("../controllers/blog");


router.get("/view-crear", blogController.viewAgregarPublicaion);
router.get("/view-blog", blogController.viewBlog);
router.get("/eliminar/:idPublicacion", blogController.eliminarPublicacion);

router.post("/agregar", blogController.agregarPublicacion);


module.exports = router;