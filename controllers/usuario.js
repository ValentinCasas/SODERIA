const { Usuario, Comercio, Foro } = require("../models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const fs = require('fs');

const jwt = require("jsonwebtoken");
const secretKey = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4OTg3OTYzMCwiaWF0IjoxNjg5ODc5NjMwfQ.EW7Yk6kbmR5s3L1MeyVNoV8x4_T3FZOLPBYPOdO6KJQ";


exports.viewActualizar = async (req, res, next) => {
    const usuarios = await Usuario.findAll();
    const comercios = await Comercio.findAll();
    res.render('usuarios', { Usuarios: usuarios, Comercios: comercios });
}



exports.viewPerfil = async (req, res, next) => {

    if (!req.user) {
        return res.redirect("/auth/view/login");
    }

    const { id } = req.user; // Obtenemos el ID del usuario del token JWT

    try {
        const usuario = await Usuario.findByPk(id);
        const comercio = await Comercio.findOne({ where: { id: usuario.idComercio } });
        res.render('mi-perfil', { Usuario: usuario, Comercio: comercio, Rol: Rol });
    } catch (error) {

        console.error("Error al obtener el perfil del usuario:", error);
        res.redirect("/home");
    }
};


exports.viewEditarPerfil = async (req, res, next) => {

    if (!req.user) {
        return res.redirect("/auth/view/login");
    }

    const { id } = req.user; //JWT

    const usuario = await Usuario.findByPk(id);
    const comercios = await Comercio.findAll();
    res.render('editar-perfil', { Usuario: usuario, Comercios: comercios, Rol: Rol });
}



const Rol = {
    1: 'administrador',
    2: 'empleado',
};


exports.viewCrear = async (req, res, next) => {

    const usuarios = await Usuario.findAll();
    const comercios = await Comercio.findAll();

    res.render('crear-usuario', { Usuarios: usuarios, Comercios: comercios });
}

const passwordRegex = /^(?=.*\d).{8,}$/;

exports.agregarUsuario = async (req, res, next) => {
    try {
        const { nombre, mail, clave, claveRepetida, telefono, correoContacto, idComercio } = req.body;
        let { rol } = req.body;

        let rutaImagen = "";
        let imagenUrl;

        if (clave != claveRepetida) {
            return res.json({ success: false, error: 'Las contraseñas no coinciden' });
        }

        if (!passwordRegex.test(clave)) {
            return res.json({ success: false, error: 'La contraseña debe tener al menos 8 caracteres y un número.' });
        }


        if (req.files === null) {
            rutaImagen = "usuario-x.png";
        } else {
            imagenUrl = req.files.imagenUrl;
            rutaImagen = uuid.v1() + imagenUrl.name;
        }

        const salt = await bcrypt.genSalt(10);
        const contraseniaHash = await bcrypt.hash(clave, salt);

        const usuarioExistente = await Usuario.findOne({ where: { mail: mail } });
        if (usuarioExistente) {
            return res.json({ success: false, error: 'Ya hay un usuario con el email: ' + mail });
        }

        const nuevoUsuario = await Usuario.create({
            nombreCompleto: nombre,
            mail: mail,
            clave: contraseniaHash,
            telefono: telefono,
            correoContacto: correoContacto,
            idComercio: idComercio,
            fechaRegistro: new Date(),
            rol: rol,
            imagenUrl: rutaImagen,
        });

        if (imagenUrl) {
            imagenUrl.mv("./public/imagen-usuario/" + rutaImagen);
        }

        res.json({ success: true, message: 'Usuario creado correctamente' });
    } catch (error) {
        next(error);
    }
};


exports.eliminarUsuario = async (req, res, next) => {
    try {
        const { idUsuario } = req.params;

        const usuario = await Usuario.findOne({ where: { id: idUsuario } });
        if (!usuario) {
            return res.json({ success: false, error: 'El usuario no existe' });
        }

        const rutaImagen = `./public/imagen-usuario/${usuario.imagenUrl}`;

        await Foro.update(
            { idAdmin: null },
            { where: { idAdmin: idUsuario } }
        );

        await Usuario.destroy({ where: { id: idUsuario } });


        if (usuario.imagenUrl != "usuario-x.png") {

            fs.unlinkSync(rutaImagen, (err) => {
                if (err) throw err;
            });
        }

        res.json({ success: true, message: 'El usuario ha sido eliminado exitosamente' });
    } catch (error) {
        next(error);
    }
};


exports.actualizarUsuarios = async (req, res, next) => {
    try {
        const usuarios = await Usuario.findAll();
        const usuariosActualizados = [];
        const usuariosNoActualizados = [];

        for (const usuario of usuarios) {
            const usuarioId = usuario.id;
            const updates = {};

            // Propiedades que se pueden actualizar
            const actualizable = ["nombreCompleto", "mail", "telefono", "correoContacto", "rol", "idComercio"];

            actualizable.forEach((prop) => {
                const valor = req.body[`${prop}-${usuarioId}`];
                if (valor) {
                    // Convertir "rol" a un número entero si es necesario
                    if (prop === "rol") {
                        updates[prop] = parseInt(valor, 10);
                    } else {
                        updates[prop] = valor;
                    }
                }
            });

            // Validar si el nuevo correo electrónico ya existe en otro usuario
            if (updates.mail && updates.mail !== usuario.mail) {
                const usuarioConMismoMail = await Usuario.findOne({ where: { mail: updates.mail } });
                if (usuarioConMismoMail) {
                    usuariosNoActualizados.push({ id: usuarioId, mensaje: "Ya existe otro usuario con el mismo correo electrónico" });
                    continue; // Pasar al siguiente usuario sin actualizar
                }
            }

            const claveAntigua = req.body[`claveAntigua-${usuarioId}`];
            const claveNueva = req.body[`clave-${usuarioId}`];

            if (claveAntigua !== '' && claveNueva) {
                // Validar la contraseña antigua
                const isPasswordValid = await bcrypt.compare(claveAntigua, usuario.clave);
                if (!isPasswordValid) {
                    usuariosNoActualizados.push({ id: usuarioId, mensaje: "Contraseña antigua incorrecta" });
                    continue; // Pasar al siguiente usuario sin actualizar
                }

                // Validar la nueva contraseña
                if (!passwordRegex.test(claveNueva)) {
                    usuariosNoActualizados.push({ id: usuarioId, mensaje: "La contraseña debe tener al menos 8 caracteres y contener al menos un número" });
                    continue; // Pasar al siguiente usuario sin actualizar
                }

                // Encriptar la nueva contraseña y agregarla a las actualizaciones
                const hashedPassword = await bcrypt.hash(claveNueva, 10);
                updates.clave = hashedPassword;
            }

            // Actualizar la imagen del usuario si se proporciona
            if (req.files && req.files[`imagen-${usuarioId}`]) {
                const imagenUsuario = req.files[`imagen-${usuarioId}`];
                const rutaImagen = uuid.v1() + imagenUsuario.name;

                // Eliminar archivo de imagen anterior
                if (usuario.imagenUrl !== "usuario-x.png") {
                    const rutaImagenAnterior = `./public/imagen-usuario/${usuario.imagenUrl}`;
                    fs.unlinkSync(rutaImagenAnterior);
                }

                // Subir nuevo archivo de imagen
                await imagenUsuario.mv(`./public/imagen-usuario/${rutaImagen}`);
                updates.imagenUrl = rutaImagen;
            }

            // Aplicar las actualizaciones y guardar los cambios del usuario
            Object.assign(usuario, updates);
            await usuario.save();
            usuariosActualizados.push(usuario);
        }

        if (usuariosNoActualizados.length === 0) {
            res.json({ success: true, message: "Usuarios actualizados correctamente" });
        } else {
            const mensajesNoActualizados = usuariosNoActualizados.map((usuarioNoActualizado) => usuarioNoActualizado.mensaje);
            res.json({ success: false, message: mensajesNoActualizados.join(", ") });
        }

    } catch (error) {
        next(error);
    }
};


exports.actualizarPerfil = async (req, res, next) => {
    try {
        const { nombreCompleto, mail, telefono, claveAntigua, clave, correoContacto, rol, idComercio } = req.body;

        if (!req.user) {
            return res.redirect("/auth/view/login");
        }

        const { id } = req.user; //JWT

        const usuarioActual = await Usuario.findByPk(id);

        // Validar si existe otro usuario con el mismo correo electrónico
        if (mail !== usuarioActual.mail) {
            const usuarios = await Usuario.findAll({ where: { mail: mail } });
            if (usuarios.length > 0) {
                return res.json({ success: false, message: 'El correo electrónico ya está en uso.' });
            }
        }

        // Validar la contraseña antigua y la nueva contraseña
        if (claveAntigua && clave) {
            const isPasswordValid = await bcrypt.compare(claveAntigua, usuarioActual.clave);
            if (!isPasswordValid) {
                return res.json({ success: false, message: 'La contraseña antigua es incorrecta.' });
            }
            // Validar la nueva contraseña
            if (!passwordRegex.test(clave)) {
                return res.json({
                    success: false,
                    message: 'La nueva contraseña debe tener al menos 8 caracteres y contener al menos un número.',
                });
            }
        }

        // Actualizar la imagen del usuario si se proporciona
        if (req.files && req.files[`imagenUrl`]) {
            const imagenUsuario = req.files[`imagenUrl`];
            const rutaImagen = uuid.v1() + imagenUsuario.name;

            // Eliminar archivo de imagen anterior
            if (usuarioActual.imagenUrl !== 'usuario-x.png') {
                const rutaImagenAnterior = `./public/imagen-usuario/${usuarioActual.imagenUrl}`;
                fs.unlinkSync(rutaImagenAnterior);
            }

            // Subir nuevo archivo de imagen
            await imagenUsuario.mv(`./public/imagen-usuario/${rutaImagen}`);
            usuarioActual.imagenUrl = rutaImagen;
        }

        // Aplicar las actualizaciones y guardar los cambios del usuario
        usuarioActual.nombreCompleto = nombreCompleto;
        usuarioActual.mail = mail;
        usuarioActual.telefono = telefono;
        usuarioActual.correoContacto = correoContacto;
        usuarioActual.rol = rol;
        usuarioActual.idComercio = idComercio;

        // Actualizar la contraseña solo si se proporciona una nueva contraseña
        if (clave) {
            const hashedPassword = await bcrypt.hash(clave, 10);
            usuarioActual.clave = hashedPassword;
        }

        await usuarioActual.save();

        res.json({ success: true, message: 'Perfil actualizado correctamente.' });
    } catch (error) {
        next(error);
    }
};