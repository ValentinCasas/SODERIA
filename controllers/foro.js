const { Foro, Usuario } = require("../models");


exports.viewPreguntas = async (req, res, next) => {

    const foroEnProceso = await Foro.findAll({ where: { aceptado: 0 } });
    const foroAceptado = await Foro.findAll({ where: { aceptado: 1 } });
    res.render('preguntas-foro', { ForoEnProceso: foroEnProceso, ForoAceptado: foroAceptado });
}


exports.agregarPreguntaForo = async (req, res, next) => {
    try {
        const { foro } = req.body;
        const hoy = new Date();

        const nuevaPregunta = await Foro.create({
            pregunta: foro,
            fecha: hoy,
            aceptado: 0
        });

        res.json({ success: true, pregunta: nuevaPregunta });
    } catch (error) {
        next(error);
    }
};

exports.actualizarPreguntaForo = async (req, res, next) => {
    try {
        const { id, pregunta, checkbox, respuesta } = req.body;
        const admin = await Usuario.findAll({ where: { sessionId: req.sessionID } })
        const hoy = new Date();

        const aceptado = checkbox ? true : false;

        const nuevaPregunta = await Foro.update(
            {
                pregunta: pregunta,
                aceptado: aceptado,
                respuesta: respuesta,
                idAdmin: admin[0].id,
                fecha: hoy
            },
            { where: { id: id } }
        );

        res.json({ success: true, pregunta: nuevaPregunta });
    } catch (error) {
        next(error);
    }
};



