const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth");

router.get('/view/login', authController.viewLogin);
router.post('/login', authController.login);
router.get('/logout', authController.logout);


var isAutenticatedBD = (req, res, next) => {
    if (req.session.isLoggedIn) return next();
    res.redirect("/?error=debe estar logueado para acceder a esta funcionalidad");
}


module.exports.isAutenticatedBD = isAutenticatedBD;
module.exports.router = router; 