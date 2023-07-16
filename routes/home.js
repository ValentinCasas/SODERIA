var express = require('express');
var router = express.Router();
const homeController = require("../controllers/home");
var isAutenticatedBD = require("../routes/auth").isAutenticatedBD;

router.get("/", isAutenticatedBD, homeController.viewHome);

module.exports = router;