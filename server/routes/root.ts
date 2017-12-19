import * as express from 'express';

import { EEBookRequest } from '../common/request';
import eebookLogger from '../logger/logger';
import { getEncAse192 } from '../common/util';

const LOGGER = eebookLogger.logger;
const router = express.Router();
const CAPTCHA_NAME_COOKIE = 'captcha';


router.get('/captcha-refresh', function(req, res, next) {
  const picString = parseInt(Math.random() * 9000 + 1000 + '', 10).toString();
  req.session[CAPTCHA_NAME_COOKIE] = picString;
  const encString = getEncAse192(picString);
  const result = {
    image_url: '/ajax/captcha-image/' + encString
  };
  res.send(result);
});


module.exports = router;
