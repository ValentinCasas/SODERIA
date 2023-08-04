const { Publicacion, Comentario, Usuario, Direccion } = require("../models");
const bcrypt = require("bcrypt");
const sharp = require('sharp');
const path = require('path');

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
            const ext = path.extname(imagenPublicacion.name);
            rutaImagen = uuid.v1() + path.basename(imagenPublicacion.name, ext) + '.webp';


            const buffer = await sharp(imagenPublicacion.data)
                .resize({ width: 800 })
                .withMetadata()
                .toFormat('webp')
                .toBuffer();

            // Guardar la imagen en formato WebP en el servidor
            await sharp(buffer).toFile("./public/archivo-publicacion/" + rutaImagen);
        }

        const publicacion = await Publicacion.create({
            titulo,
            descripcion,
            idAdmin: idAdmin,
            fechaSubida: hoy,
            imagenUrl: rutaImagen,
        });

        res.json({ success: true, publicacion });
    } catch (error) {
        next(error);
    }
};

const PAGE_SIZE = 5; // Número de publicaciones por página

exports.viewBlog = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1; // Página actual (por defecto, la primera)
  const offset = (page - 1) * PAGE_SIZE; // Desplazamiento para la consulta

  // Consultar la cantidad total de publicaciones
  const count = await Publicacion.count();

  const publicaciones = await Publicacion.findAll({
    include: Usuario,
    limit: PAGE_SIZE,
    offset: offset,
    order: [['fechaSubida', 'DESC']], // Ordenar por la columna correcta (fechaSubida en este caso)
  });

  const totalPages = Math.ceil(count / PAGE_SIZE);

  const comentarios = await Comentario.findAll({ include: Publicacion });
  const direcciones = await Direccion.findAll();

  res.render('blog', {
    Publicaciones: publicaciones,
    Comentarios: comentarios,
    totalPages: totalPages,
    res: res,
    Direcciones: direcciones,
    currentPage: page,
  });
};


exports.eliminarPublicacion = async (req, res, next) => {
    try {
        const { idPublicacion } = req.params;

        const publicacion = await Publicacion.findOne({ where: { id: idPublicacion } });
        if (!publicacion) {
            return res.json({ success: false, error: 'La publicacion no existe' });
        }

        const rutaImagen = `./public/archivo-publicacion/${publicacion.imagenUrl}`;

        await Comentario.destroy({ where: { idPublicacion: idPublicacion } });

        await Publicacion.destroy({ where: { id: idPublicacion } });


        if (publicacion.imagenUrl != "none") {

            fs.unlinkSync(rutaImagen, (err) => {
                if (err) throw err;
            });
        }

        res.json({ success: true, message: 'La publicación ha sido eliminada exitosamente' });
    } catch (error) {
        next(error);
    }
}
