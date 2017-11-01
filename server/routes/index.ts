import * as express from 'express';

import { EEBookRequest } from '../common/request';
import eebLogger from '../logger/logger';
import { getEncAse192 } from '../common/util';

const LOGGER = eebLogger.logger;
const router = express.Router();
const CAPTCHA_NAME_COOKIE = 'captcha';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/about', function(req, res, next) {
  EEBookRequest(req, 'GET', '/about').then(function (result) {
    res.send(result);
  }).catch(function (err) {
    throw err;
  });
});


module.exports = router;
