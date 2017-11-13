import * as express from 'express';

import { EEBookRequest } from '../common/request';
import eebookLogger from '../logger/logger';

const LOGGER = eebookLogger.logger;
const router = express.Router();

router.post('/register', function(req, res, next) {
  LOGGER.debug('Registring, req.body: ', req.body);
  EEBookRequest(req, 'POST', '/auth/register', {'data': req.body}).then(function (result) {
    res.send({'result': result });
  }).catch(function (err) {
    return next(err);
  });
});

router.post('/login', function(req, res, next) {
  LOGGER.debug('User login, req.body: ', req.body);
  EEBookRequest(req, 'POST', '/auth/generate-api-token', {'data': req.body}).then(function (result) {
    LOGGER.debug('result from api: ', result);
    req.session.regenerate(function(err) {
      if (err) {
      }
      if (!req.session.user) {
        req.session.user = {};
      }
      req.session.user['username'] = result.username;
      req.session.user['token'] = result.token;
      LOGGER.debug('req session loginUser: ', req.session);
      res.send({'result': result});
    });
  }).catch(function (err) {
    return next(err);
  });
});

router.get('/logout', function(req, res, next){
  LOGGER.debug('User logout...');
  LOGGER.debug('User session user: ', req.session.user);
  LOGGER.debug('User session: ', req.session);
  req.session.destroy();
  res.send({'': ''});
});


router.post('/auth/github', function(req, res, next){

});

module.exports = router;
