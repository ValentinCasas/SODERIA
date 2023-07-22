const { Publicacion, Comentario, Usuario } = require("../models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const fs = require('fs');


exports.viewAgregarPublicaion = async (req, res, next) => res.render('agregar-publicacion');

exports.agregarPublicacion = async (req, res, next) => {
    try {
        const { titulo, descripcion } = req.body;

        if (!req.user) {
            return res.redirect("/auth/view/login");
        }

        const hoy = new Date();
        const idAdmin = req.user.id; // JWT

        let rutaImagen = "";
        let imagenPublicacion;

        if (req.files === null) {
            rutaImagen = "none";
        } else {
            imagenPublicacion = req.files.imagenUrl;
            rutaImagen = uuid.v1() + imagenPublicacion.name;
        }

        const publicacion = await Publicacion.create({
            titulo,
            descripcion,
            idAdmin: idAdmin,
            fechaSubida: hoy,
            imagenUrl: rutaImagen,
        });

        if (imagenPublicacion) {
            await imagenPublicacion.mv("./public/archivo-publicacion/" + rutaImagen);
        }

        res.json({ success: true, publicacion });
    } catch (error) {
        next(error);
    }
};

exports.viewBlog = async (req, res, next) => {
    const publicaciones = await Publicacion.findAll({ include: Usuario });
    const comentarios = await Comentario.findAll({ include: Publicacion });

    res.render('blog', { Publicaciones: publicaciones, Comentarios: comentarios });
}

