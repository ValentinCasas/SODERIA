const { Usuario } = require("../models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const fs = require('fs');

exports.viewActualizar = async (req, res, next) => {

    const usuarios = await Usuario.findAll();
    res.render('usuarios', { Usuarios: usuarios });
}


exports.viewCrear = async (req, res, next) => {

    const usuarios = await Usuario.findAll();
    res.render('crear-usuario', { Usuarios: usuarios });
}