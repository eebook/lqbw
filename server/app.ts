/**
 * eebook - app.js
 */


import * as express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as passport from 'passport';
const methodOverride = require('method-override');
const RedisStore = require('connect-redis')(session);
// import * as FileStore from 'session-file-store';
// let FileStore = require('session-file-store')(session);

import config from '../config';
import eebLogger from './logger/logger';
import EEBookErrorResponse from './common/exceptions';
import * as index from './routes/index';
import * as people from './routes/people';
import * as auth from './routes/auth';
import * as account from './routes/account';
import * as job_configs from './routes/job_configs';
import * as job from './routes/jobs';
import * as search from './routes/search';
require('dotenv').config();


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
app.use(methodOverride());
app.use(express.static(path.join(__dirname, '..', 'public')));

// const fileStore = FileStore(session);

app.use(session({
  secret: 'sessionsecret',
  // store: TODO: store in redis?
  store: new RedisStore(),
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

app.use('/', index);
app.use('/people', people);
app.use('/auth', auth);
app.use('/ajax/auth', account);
app.use('/ajax/job_configs', job_configs);
app.use('/ajax/jobs', job);
app.use('/ajax/search', search);
app.use('*', index);


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
  // var err = new Error('Not Found');
  // err.status = 404;
  // next(err);
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.error = err;

  // render the error page
  res.status(err.statusCode || 500);
  res.send(JSON.stringify(new EEBookErrorResponse(
    [err.error], 400)));
});

if (!module.parent) {
  app.listen(config.PORT, function () {
    logger.info('eebook listening on port', config.PORT);
    logger.info('May the force be with you...');
    logger.info('You can debug your app with http://' + config.HOST + ':' + config.PORT);
  });
}

export { app };
