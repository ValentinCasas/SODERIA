const { Usuario, Zona, Direccion, ZonaDireccion } = require("../models");



exports.viewCrearZona = async (req, res, next) => {
    const zonas = await Zona.findAll();
    const direcciones = await Direccion.findAll();
    const zonaDirecciones = await ZonaDireccion.findAll({ include: [Zona, Direccion], });
    res.render('crear-zona', { Zonas: zonas, Direcciones: direcciones, ZonaDirecciones: zonaDirecciones });
}

exports.agregarZona = async (req, res, next) => {
    try {
        const { nombre } = req.body;

        const zona = await Zona.create({ nombre }); // Pass the object with the 'nombre' property

        res.json({ success: true, zona });
    } catch (error) {
        next(error);
    }
};

exports.eliminarZona = async (req, res, next) => {
    const { idZona } = req.params;

    try {
        const zonaDirecciones = await ZonaDireccion.findAll({ where: { idZona: idZona } });
        if (zonaDirecciones) {
            const zonaDireccion = await ZonaDireccion.destroy({ where: { idZona: idZona } });
        }

        const zona = await Zona.destroy({ where: { id: idZona } });

        res.json({ success: true, zona })

    } catch (error) {
        return next();
    }

}

exports.enlistarDireccion = async (req, res, next) => {
    try {
        const { idZona, idDireccion } = req.body;

        const newZonaDireccion = await ZonaDireccion.create({ idZona: idZona, idDireccion: idDireccion });
        const zonaDireccion = await ZonaDireccion.findByPk(newZonaDireccion.id, { include: [Zona, Direccion] });

        res.json({ success: true, zonaDireccion });
    } catch (error) {
        next(error);
    }
};


exports.eliminarZonaDireccion = async (req, res, next) => {
    const { idZonaDireccion } = req.params;

    try {

        const zonaDireccion = await ZonaDireccion.destroy({ where: { id: idZonaDireccion } });

        res.json({ success: true, zonaDireccion })

    } catch (error) {
        return next();
    }

}