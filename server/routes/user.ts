import * as express from 'express';

import { EEBookRequest } from '../common/request';
import eebookLogger from '../logger/logger';
import { getEncAse192 } from '../common/util';

const LOGGER = eebookLogger.logger;
const router = express.Router();
const CAPTCHA_NAME_COOKIE = 'captcha';


router.post('/send_verify_code', function(req, res, next) {
  LOGGER.debug('TODO: send captcha code');
  LOGGER.debug('req.body???', req.body);
  LOGGER.debug('captcha???' + req.session.captcha);

  const code = req.body.code;
  const realCode = req.session.captcha;

  LOGGER.info('User input code: ', code, 'realCode: ', realCode);
  if (code != null && realCode != null && code === realCode) {
    LOGGER.info('TODO: Send verify code');
    LOGGER.info('request. body: ' + req.body);
    EEBookRequest(req, 'POST', '/user/send_verify_code', {'data': req.body}).then(function (result) {
      res.send(result);
    }).catch(function (err) {
      throw err;
    });
  } else {
    const picString = parseInt(Math.random() * 9000 + 1000 + '', 10).toString();
    req.session[CAPTCHA_NAME_COOKIE] = picString;
    const encString = getEncAse192(picString);
    const result = {
      image_url: '/ajax/captcha-image/' + encString
    };
    res.status(200).send(result);
  }

});

module.exports = router;
