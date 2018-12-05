import * as express from 'express';

import { EEBookRequest } from '../common/request';
import eebookLogger from '../logger/logger';
import * as captchapng from 'captchapng';
import { getDecAse192 } from '../common/util';

const LOGGER = eebookLogger.logger;
const router = express.Router();

function getImage(rstring: string) {
  // width,height,numeric captcha
  const p = new captchapng(80, 30, rstring);
  // First color: background (red, green, blue, alpha)
  p.color(0, 0, 0, 0);
  // Second color: paint (red, green, blue, alpha)
  p.color(80, 80, 80, 255);
  const img = p.getBase64();
  return new Buffer(img, 'base64');
}

router.get('/:captchaString', function(req, res, next) {
  LOGGER.info('Get autocomplete items');
  LOGGER.info('captchastring: ', req.params.captchaString);
  res.writeHead(200, {
      'Content-Type': 'image/png'
  });
  const decString = getDecAse192(req.params.captchaString);
  LOGGER.info('decString???' + decString);
  res.end(getImage(decString));
});

router.get('*', function(req, res, next) {
  req.user = req.session.user;
  if (req.user === null) {
    LOGGER.info('user is null');
    res.render('index', { title: 'Express' });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
