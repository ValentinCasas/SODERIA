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


        let isAdmin = req.user ? req.user.rol === "administrador" : false;


        res.json({ comentarios, imagenesUrls, isAdmin });

    } catch (error) {
        // Manejo de errores
        res.status(500).json({ message: 'Error al obtener los comentarios', error: error.message });
    }
};

exports.crearComentario = async (req, res, next) => {
    try {
        const { idPublicacion, descripcion } = req.body;

        const hoy = new Date();

        const comentario = await Comentario.create({

            descripcion,
            idPublicacion: idPublicacion,
            fechaEnvio: hoy,
        });

        // Obtener la lista de archivos en la carpeta '/imagenes-feedback'
        const imagenes = fs.readdirSync("public/imagenes-retroalimentacion");

        // Crear un array con URLs aleatorias de las imágenes
        const imagenesUrls = imagenes.map(imagen => {
            return `${imagen}`;
        });

        res.json({ success: true, comentario, imagenesUrls,  });
    } catch (error) {
        next(error);
    }
};


exports.eliminarComentario = async (req, res, next) => {
    try {
        const { idComentario } = req.params;

        await Comentario.destroy({ where: { id: idComentario } });

        res.json({ success: true, idComentario: idComentario });
    } catch (error) {
        next(error);
    }
}
