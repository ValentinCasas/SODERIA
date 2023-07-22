var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const bodyparser = require('body-parser');
const upload = require("express-fileupload");

const jwt = require("jsonwebtoken");
const secretKey = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4OTg3OTYzMCwiaWF0IjoxNjg5ODc5NjMwfQ.EW7Yk6kbmR5s3L1MeyVNoV8x4_T3FZOLPBYPOdO6KJQ";



var isAutenticatedBD = require("./routes/auth").isAutenticatedBD;
const authRouter = require('./routes/auth').router;
const indexRouter = require('./routes/index');
const homeRouter = require('./routes/home');
const productoRouter = require('./routes/producto');
const foroRouter = require('./routes/foro');
const usuarioRouter = require('./routes/usuario');
const comercioRouter = require('./routes/comercio');
const retroalimentacionRouter = require('./routes/retroalimentacion');
const blogRouter = require('./routes/blog');
const comentariosRouter = require('./routes/comentario');


var app = express();

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "oD8xq9t#G?63$YLz2*",
  })
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'fonts')));
app.use(express.static(path.join(__dirname, 'public/stylesheets')));
app.use(express.static(path.join(__dirname, 'public/javascripts')));
app.use(express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.join(__dirname, 'public/imagen-producto')));
app.use(express.static(path.join(__dirname, 'public/imagen-comercio')));
app.use(express.static(path.join(__dirname, 'public/imagen-usuario')));
app.use(express.static(path.join(__dirname, 'public/imagenes-por-defecto')));
app.use(express.static(path.join(__dirname, 'public/imagenes-retroalimentacion')));
app.use(express.static(path.join(__dirname, 'public/archivo-publicacion')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(upload({ limits: { fileSize: 1024 * 1024 } }));
app.use(cookieParser());

// Middleware para verificar el token en cada solicitud
app.use(function (req, res, next) {
  // Verificar token en cada solicitud (excepto en las rutas de autenticación)
  if (!req.path.startsWith("/auth")) {
    const token = req.cookies.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // Añadimos el usuario al objeto req para que esté disponible en otras partes del código
      } catch (err) {
        // Si el token es inválido, puedes manejarlo aquí (por ejemplo, redirigir a la página de inicio de sesión)
        console.error("Token inválido:", err);
      }
    }
  }

  // Resto del middleware para res.locals
  res.locals.isLoggedIn = req.session.isLoggedIn || false;
  res.locals.role = req.session.role || "guest";
  res.locals.miSesion = req.session.miSesion || "-1";
  next();
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/home', isAutenticatedBD, homeRouter);
app.use('/productos', isAutenticatedBD, productoRouter);
app.use('/foro', foroRouter);
app.use('/usuario', isAutenticatedBD, usuarioRouter);
app.use('/comercio', isAutenticatedBD, comercioRouter);
app.use('/retroalimentacion', retroalimentacionRouter);
app.use('/blog', blogRouter);
app.use('/comentarios', comentariosRouter);






// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
