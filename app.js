const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// view engine setup (EJSは他画面用に残す場合)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
}));

app.use(flash());

// authorization
require("./config/passport")(app);

// ルートは /schedule へリダイレクト
app.get('/', (req, res) => res.redirect('/schedule'));

// schedule ルーティングを読み込み
const scheduleRouter = require('./routes/schedule');
app.use('/schedule', scheduleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
