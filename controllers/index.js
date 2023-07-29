const { Foro, Usuario, Producto, Retroalimentacion, Publicacion, Zona, Direccion } = require("../models");

const fs = require('fs');

exports.viewIndex = async (req, res, next) => {
    const productos = await Producto.findAll();
    const foro = await Foro.findAll({
        where: { aceptado: 1 },
        include: Usuario
    });
    const retroalimentaciones = await Retroalimentacion.findAll({
        where: { aceptado: 1 }
    });

    // Obtener la lista de archivos en la carpeta '/imagenes-feedback'
    const imagenes = fs.readdirSync("public/imagenes-retroalimentacion");

    // Crear un array con URLs aleatorias de las imágenes
    const imagenesUrls = imagenes.map(imagen => {
        return `${imagen}`;
    });

    const direcciones = await Direccion.findAll();

    res.render('index', {
        Foro: foro,
        Productos: productos,
        Retroalimentaciones: retroalimentaciones,
        ImagenesUrls: imagenesUrls,
        Direcciones: direcciones
    });
}

