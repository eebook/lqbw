import * as express from 'express';

import { EEBookRequest } from '../common/request';
import eebookLogger from '../logger/logger';

const logger = eebookLogger.logger;
const router = express.Router();

router.post('/register', function(req, res, next) {
  logger.debug('Registring, req.body: ', req.body);
  EEBookRequest(req, 'POST', '/auth/register', {'data': req.body}).then(function (result) {
    res.send({'result': result });
  }).catch(function (err) {
    throw err;
  });
});

router.post('/login', function(req, res, next) {
  logger.debug('User login, req.body: ', req.body);
  EEBookRequest(req, 'POST', '/auth/generate-api-token', {'data': req.body}).then(function (result) {
  // res.send({'result': result });
    logger.debug('result from api: ', result);
    req.session.regenerate(function(err) {
      if (err) {
      }
      if (!req.session.user) {
        req.session.user = {};
      }
      req.session.user['username'] = result.username;
        logger.debug('req session loginUser: ', req.session);
        // res.json({'1': '2'});
            // next();
        res.send({'result': result});
      });
    }).catch(function (err) {
        throw err;
    });
});

router.get('/logout', function(req, res, next){
  logger.debug('User logout...');
  logger.debug('User session user: ', req.session.user);
  logger.debug('User session: ', req.session);
  req.session.destroy();
  res.send({'': ''});
});

module.exports = router;
