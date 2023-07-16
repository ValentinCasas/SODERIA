
const { Usuario } = require("../models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

const Rol = {
  1: 'administrador',
  2: 'empleado'
};

/* auth/view/login */
exports.viewLogin = (req, res) => res.render('login');

/* auth/login */
exports.login = async (req, res, next) => {
  const { correo, clave } = req.body;
  const sessionId = req.sessionID;

  const user = await Usuario.findOne({ where: { mail: correo } });
  const validado = user && await bcrypt.compare(clave, user.clave);

  if (validado) {
    await Usuario.update({ sessionId: sessionId }, { where: { mail: correo } });
    req.session.isLoggedIn = true;
    req.session.role = Rol[user.rol];
    return res.redirect("/home");
  }

  res.render("login", { error: validado ? 'contraseña incorrecta' : 'credenciales invalidas' });
};

/* auth/logout */
exports.logout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/")
  });
}


