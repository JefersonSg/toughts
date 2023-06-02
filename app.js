var createError = require('http-errors');
var express = require('express');
const exphbs = require('express-handlebars');
const { engine } = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');

var toughtsRouter = require('./routes/toughtsRouter');
var authRoutes = require('./routes/authRoutes');

const ToughtController = require('./controllers/ToughtController');
const AuthController = require('./controllers/AuthController');

var app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  '/auth/stylesheets',
  express.static(__dirname + '/public/stylesheets', {
    setHeaders: (res, path) => {
      if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
    },
  }),
);
app.use(
  '/toughts/stylesheets',
  express.static(__dirname + '/public/stylesheets', {
    setHeaders: (res, path) => {
      if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
    },
  }),
);

// script
app.use(
  '/toughts/javascripts',
  express.static(__dirname + '/public/javascripts', {
    setHeaders: (res, path) => {
      if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
    },
  }),
);

// session middleware
app.use(
  session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now + 360000),
      httpOnly: true,
    },
  }),
);

// flash messages
app.use(flash());

// set session to res
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }

  next();
});

app.use('/toughts', toughtsRouter);
app.use('/auth', authRoutes);

// Routers
app.get('/', toughtsRouter);

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
