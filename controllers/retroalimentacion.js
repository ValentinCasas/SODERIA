const { Retroalimentacion, Usuario } = require("../models");


exports.viewRetroalimentaciones = async (req, res, next) => {

    const retroalimentacionEnProceso = await Retroalimentacion.findAll({ where: { aceptado: 0 } });
    const retroalimentacionAceptado = await Retroalimentacion.findAll({ where: { aceptado: 1 } });
    res.render('retroalimentaciones', {
        RetroalimentacionEnProceso: retroalimentacionEnProceso,
        retroalimentacionAceptado: retroalimentacionAceptado
    });
}


exports.agregarRetroalimentacion = async (req, res, next) => {
    try {
        const { retroalimentacion } = req.body;
        const hoy = new Date();

        const nuevaRetroalimentacion = await Retroalimentacion.create({
            descripcion: retroalimentacion,
            fechaEnvio: hoy,
            aceptado: 0
        });

        res.json({ success: true });
    } catch (error) {
        next(error);
    }
};

exports.actualizarRetroalimentacion = async (req, res, next) => {
    try {
        const { id, descripcion, checkbox } = req.body;

        if (!req.user) {
            return res.redirect("/auth/view/login");
        }

        const idAdmin = req.user.id; // JWT
        const hoy = new Date();
        const aceptado = checkbox ? true : false;

        const nuevaRetroalimentacion = await Retroalimentacion.update(
            {
                descripcion: descripcion,
                aceptado: aceptado,
                fechaEnvio: hoy
            },
            { where: { id: id } }
        );

        res.json({ success: true });
    } catch (error) {
        next(error);
    }
};


exports.eliminarRetroalimentacion = async (req, res, next) => {
    try {
        const { idRetroalimentacion } = req.params;


        await Retroalimentacion.destroy({ where: { id: idRetroalimentacion } });


        res.json({ success: true, message: "El producto ha sido eliminado exitosamente" });
    } catch (error) {
        next(error);
    }
}

