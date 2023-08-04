
const { Usuario } = require("../models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

const jwt = require("jsonwebtoken");
const secretKey = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4OTg3OTYzMCwiaWF0IjoxNjg5ODc5NjMwfQ.EW7Yk6kbmR5s3L1MeyVNoV8x4_T3FZOLPBYPOdO6KJQ";


const Rol = {
  1: 'administrador',
  2: 'empleado'
};



exports.viewLogin = (req, res) => res.render('login');


/* exports.login = async (req, res, next) => {
  const { correo, clave } = req.body;
  let = sessionId = req.sessionID;

  const user = await Usuario.findOne({ where: { mail: correo } });
  const validado = user && await bcrypt.compare(clave, user.clave);

  if (validado) {
    await Usuario.update({ sessionId: sessionId }, { where: { mail: correo } });
    req.session.isLoggedIn = true;
    req.session.role = Rol[user.rol];
    req.session.miSesion = sessionId;
    return res.redirect("/home");
  }

  res.render("login", { error: validado ? 'contraseña incorrecta' : 'credenciales invalidas' });
}; */



exports.login = async (req, res, next) => {
  const { correo, clave } = req.body;
  
  const user = await Usuario.findOne({ where: { mail: correo } });
  const validado = user && await bcrypt.compare(clave, user.clave);

  if (validado) {
    const tokenPayload = {
      id: user.id,
      rol: Rol[user.rol],
      nombreCompleto: user.nombreCompleto,
      mail: user.mail,
    };

    const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "4h" }); // El token expirará después de 1 hora

    req.session.isLoggedIn = true;
    req.session.role = Rol[user.rol];
    req.session.miSesion = user.sessionId; // Aquí puedes mantener el sessionId si es necesario
    res.cookie("token", token); // Enviamos el token como cookie
    return res.redirect("/home");
  }

  res.render("login", { error: validado ? 'contraseña incorrecta' : 'credenciales invalidas' });
};



exports.logout = (req, res, next) => {
  // Si hay un token almacenado en las cookies, invalidarlo (estableciendo la fecha de expiración en el pasado)
  if (req.cookies.token) {
    res.cookie("token", "", { expires: new Date(0) });
  }

  req.session.destroy(() => {
    res.redirect("/auth/view/login");
  });
};


