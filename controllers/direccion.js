const { Usuario, Direccion, ZonaDireccion } = require("../models");


exports.agregarDireccion = async (req, res, next) => {
    try {
        const { nombre } = req.body;

        const direccion = await Direccion.create({ nombre }); 

        res.json({ success: true, direccion });
    } catch (error) {
        next(error);
    }
};

exports.eliminarDireccion = async (req, res, next) => {
    const { idDireccion } = req.params;

    try {
        const zonaDirecciones = await ZonaDireccion.findAll({ where: { idDireccion: idDireccion } });
        if(zonaDirecciones){
            const zonaDireccion = await ZonaDireccion.destroy({ where: { idDireccion: idDireccion } });
        }

        const direccion = await Direccion.destroy({ where: { id: idDireccion } });

        res.json({ success: true, direccion })

    } catch (error) {
        return next();
    }

}
