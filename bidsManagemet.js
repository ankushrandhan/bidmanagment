const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
require('./helpers/constants');
const app = express();
var http = require('http').createServer(app);
const baseMiddleware = require('./helpers/baseMiddleware');
require('dotenv').config();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
 app.use(express.json());
//app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

app.set('trust proxy', 1)

app.use(baseMiddleware);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules_url', express.static(path.join(__dirname, 'node_modules')));
app.use(function(req, res, next) {
  
  global.BASE_URL = `${req.protocol}://${req.get('host')}`;
  next();
});
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});
require('./routes/router')(app);

http.listen(global.appPort, (err, resu) => {
  if (err) throw err;
  console.log(`server listening on port: ${global.appPort}`);
});

module.exports = app;