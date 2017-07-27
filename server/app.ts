/**
 * eebook - app.js
 */


import * as express from "express";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";

import * as logger from "./common/logger";
import * as config from "../config";
import * as index from "./routes/index";
import * as users from "./routes/users";


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require)

// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

var urlinfo = require('url').parse(config.host);
config.hostname = urlinfo.hostname || config.host;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

if (!module.parent) {
  app.listen(config.port, function () {
    logger.info('eebook listening on port', config.port);
    logger.info('May the force be with you...');
    logger.info('You can debug your app with http://' + config.hostname + ':' + config.port);
  });
}


module.exports = app;