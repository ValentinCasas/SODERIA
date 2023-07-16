const { Foro,Usuario } = require("../models");

exports.viewIndex = async (req, res, next) => {

    const foro = await Foro.findAll({
        where: { aceptado: 1 },
        include: Usuario
    });

    res.render('index', { foro: foro });
}
