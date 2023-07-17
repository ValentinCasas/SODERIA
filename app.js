var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require("method-override");
const session = require("express-session");
var cookieParser = require('cookie-parser');
const passport = require("passport");
const bodyparser = require('body-parser');
const upload = require("express-fileupload");

var isAutenticatedBD = require("./routes/auth").isAutenticatedBD;
const authRouter = require('./routes/auth').router;
const indexRouter = require('./routes/index');
const homeRouter = require('./routes/home');
const productoRouter = require('./routes/producto');
const foroRouter = require('./routes/foro');

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
app.use(express.static(path.join(__dirname, 'public/imagenes-por-defecto')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(upload({ limits: { fileSize: 1024 * 1024 } }));
app.use(cookieParser());

//middlewarre que añade isLoggedIn a res.locals
app.use(function (req, res, next) {
  res.locals.isLoggedIn = req.session.isLoggedIn || false;
  res.locals.role = req.session.role || "guest";
  next();
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/home', homeRouter);
app.use('/productos', productoRouter);
app.use('/foro', foroRouter);







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
