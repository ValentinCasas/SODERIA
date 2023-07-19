const { Comercio, Usuario } = require("../models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const fs = require('fs');


exports.viewCrearComercios = async (req, res, next) => {
    res.render('crear-comercio');
}

exports.viewComercios = async (req, res, next) => {

    const comercios = await Comercio.findAll();
    res.render('comercios', { Comercios: comercios });
}

exports.agregarComercio = async (req, res, next) => {
    try {
        const { nombre, direccion, latitud, longitud } = req.body;

        let rutaImagen = "";
        let imagenComercio;

        if (req.files === null) {
            rutaImagen = "comercio-x.png";
        } else {
            imagenComercio = req.files.imagenUrl;
            rutaImagen = uuid.v1() + imagenComercio.name;
        }

        const producto = await Comercio.create({
            nombre,
            direccion,
            latitud,
            longitud,
            imagenUrl: rutaImagen,
        });

        if (imagenComercio) {
            await imagenComercio.mv("./public/imagen-comercio/" + rutaImagen);
        }

        res.json({ success: true, producto });
    } catch (error) {
        next(error);
    }
};


exports.eliminarComercio = async (req, res, next) => {
    try {
        const { idComercio } = req.params;

        await Usuario.update({ idComercio: null }, { where: { idComercio: idComercio } });
        const comercio = await Comercio.findByPk(idComercio);

        if (!comercio) {
            res.json({ success: false, message: 'Comercio no encontrado' });
        }

        let rutaImagen = `./public/imagen-comercio/${comercio.imagenUrl}`;

        await Comercio.destroy({ where: { id: idComercio } });

        if (comercio.imagenUrl && comercio.imagenUrl !== "comercio-x.png") {
            fs.unlinkSync(rutaImagen, (err) => {
                if (err) throw err;
            });
        }

        res.json({ success: true, message: 'Comercio eliminado exitosamente' });
    } catch (error) {
        next(error);
    }
}


exports.actualizarComercios = async (req, res, next) => {
    try {
        const comercios = await Comercio.findAll();
        const comerciosActualizados = [];
        const comerciosNoActualizados = [];

        for (const comercio of comercios) {
            const nombre = req.body[`nombre-${comercio.id}`];
            const direccion = req.body[`direccion-${comercio.id}`];
            const latitud = req.body[`latitud-${comercio.id}`];
            const longitud = req.body[`longitud-${comercio.id}`];

            if (nombre) {
                comercio.nombre = nombre;
            }
            if (direccion) {
                comercio.direccion = direccion;
            }
            if (latitud) {
                comercio.latitud = latitud;
            }
            if (longitud) {
                comercio.longitud = longitud;
            }

            let rutaImagen = "";
            let imagenComercio;

            if (req.files && req.files[`imagen-${comercio.id}`]) {
                imagenComercio = req.files[`imagen-${comercio.id}`];
                rutaImagen = uuid.v1() + imagenComercio.name;

                // Eliminar archivo de imagen anterior
                if (comercio.imagenUrl !== "comercio-x.png") {
                    const rutaImagenAnterior = `./public/imagen-comercio/${comercio.imagenUrl}`;
                    fs.unlinkSync(rutaImagenAnterior);
                }

                // Subir nuevo archivo de imagen
                await imagenComercio.mv(`./public/imagen-comercio/${rutaImagen}`);
                comercio.imagenUrl = rutaImagen;
            }

            await comercio.save();
            comerciosActualizados.push(comercio);
        }

        res.json({ success: true, message: "Comercios actualizados correctamente", comerciosNoActualizados });
    } catch (error) {
        next(error);
    }
};
