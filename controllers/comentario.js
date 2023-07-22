const { Comentario, Publicacion } = require('../models');
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const fs = require('fs');

exports.getComentarios = async (req, res, next) => {
    try {
        const { idPublicacion } = req.params;

        const publicacion = await Publicacion.findByPk(idPublicacion);

        if (!publicacion) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }

        const comentarios = await Comentario.findAll({ where: { idPublicacion: idPublicacion } });

        if (comentarios.length === 0) {
            return res.status(404).json({ message: 'No hay comentarios para esta publicación' });
        }

        // Obtener la lista de archivos en la carpeta '/imagenes-feedback'
        const imagenes = fs.readdirSync("public/imagenes-retroalimentacion");

        // Crear un array con URLs aleatorias de las imágenes
        const imagenesUrls = imagenes.map(imagen => {
            return `${imagen}`;
        });


        res.json({comentarios, imagenesUrls});
    } catch (error) {
        // Manejo de errores
        res.status(500).json({ message: 'Error al obtener los comentarios', error: error.message });
    }
};
