const { Foro, Usuario } = require("../models");
const jwt = require("jsonwebtoken");
const secretKey = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4OTg3OTYzMCwiaWF0IjoxNjg5ODc5NjMwfQ.EW7Yk6kbmR5s3L1MeyVNoV8x4_T3FZOLPBYPOdO6KJQ";




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

        if (!req.user) {
            return res.redirect("/auth/view/login");
        }

        const idAdmin = req.user.id; // JWT
        const hoy = new Date();
        const aceptado = checkbox ? true : false;

        const nuevaPregunta = await Foro.update(
            {
                pregunta: pregunta,
                aceptado: aceptado,
                respuesta: respuesta,
                idAdmin: idAdmin,
                fecha: hoy
            },
            { where: { id: id } }
        );

        res.json({ success: true, pregunta: nuevaPregunta });
    } catch (error) {
        next(error);
    }
};


exports.eliminarPregunta = async (req, res, next) => {
    try {
        const { idPregunta } = req.params;


        await Foro.destroy({ where: { id: idPregunta } });


        res.json({ success: true, message: "La pregunta ha sido eliminada exitosamente" });
    } catch (error) {
        next(error);
    }
}




