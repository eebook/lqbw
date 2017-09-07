/**
 * eebook - app.js
 */


import * as express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
const RedisStore = require('connect-redis')(session);
// import * as FileStore from 'session-file-store';
// let FileStore = require('session-file-store')(session);

import config from '../config';
import eebLogger from './logger/logger';
import * as index from './routes/index';
import * as people from './routes/people';
import * as auth from './routes/account';
import * as job_configs from './routes/job_configs';

const logger = eebLogger.logger;
const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../public'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

// const fileStore = FileStore(session);

app.use(session({
  secret: 'sessionsecret',
  // store: TODO: store in redis?
  store: new RedisStore(),
  resave: false,
  saveUninitialized: true
}));

app.use('/', index);
app.use('/people', people);
app.use('/ajax/auth', auth);
app.use('/ajax/job_configs', job_configs);
app.use('*', index);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
  // var err = new Error('Not Found');
  // err.status = 404;
  // next(err);
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

if (!module.parent) {
  app.listen(config.PORT, function () {
    logger.info('eebook listening on port', config.PORT);
    logger.info('May the force be with you...');
    logger.info('You can debug your app with http://' + config.HOST + ':' + config.PORT);
  });
}

export { app };
