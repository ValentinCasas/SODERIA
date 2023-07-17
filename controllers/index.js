const { Foro, Usuario, Producto } = require("../models");

exports.viewIndex = async (req, res, next) => {

    const productos = await Producto.findAll();

    const foro = await Foro.findAll({
        where: { aceptado: 1 },
        include: Usuario
    });

    res.render('index', { Foro: foro, Productos: productos });
}
