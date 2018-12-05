import * as express from 'express';

import { EEBookRequest } from '../common/request';
import eebookLogger from '../logger/logger';
import { getEncAse192 } from '../common/util';

const LOGGER = eebookLogger.logger;
const router = express.Router();
const CAPTCHA_NAME_COOKIE = 'captcha';


router.post('/send_verify_code', function(req, res, next) {
  const code = req.body.code;
  const realCode = req.session.captcha;

  LOGGER.info('User input code: ', code, 'realCode: ', realCode);
  if (code != null && realCode != null && code === realCode) {
    LOGGER.info('request. body: ' + req.body);
    EEBookRequest(req, 'POST', '/user/send_verify_code', {'data': req.body}).then(function (result) {
      res.send(result);
    }).catch(function (err) {
      return next(err);
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

router.post('/reset_password', function(req, res, next) {
  LOGGER.debug('reset password');
  EEBookRequest(req, 'POST', '/user/reset_password', {'data': req.body}).then(function (result) {
    res.send(result);
  }).catch(function (err) {
    return next(err);
  });
});



module.exports = router;
