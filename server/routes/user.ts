import * as express from 'express';

import { EEBookRequest } from '../common/request';
import eebookLogger from '../logger/logger';

const LOGGER = eebookLogger.logger;
const router = express.Router();


router.post('/send_verify_code', function(req, res, next) {
  LOGGER.debug('TODO: send captcha code');
  LOGGER.debug('req.body???', req.body);
  LOGGER.debug('captcha???' + req.session.captcha);

  const code = req.body.code;
  const realCode = req.session.captcha;

  LOGGER.info('User input code: ', code, 'realCode: ', realCode);
  if (code != null && realCode != null && code === realCode) {
    LOGGER.info('TODO: Send verify code');
    EEBookRequest(req, 'POST', '/user/send_verify_code', {'email': req.body.email}).then(function (result) {
      LOGGER.info('result???' + result);
    }).catch(function (err) {
      throw err;
    });
  }

  EEBookRequest(req, 'GET', '/search/book', req).then(function (result) {
    res.send(result);
  }).catch(function (err) {
    throw err;
  });
});

module.exports = router;
