import * as express from 'express';
import passport from '../auth/github';
import eebLogger from '../logger/logger';
import { EEBookRequest } from '../common/request';

const LOGGER = eebLogger.logger;

const router = express.Router();

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/register' }),
function(req, res, next) {
  LOGGER.debug('???????');
  res.redirect('/');
});

router.post('/register', function(req, res, next) {
  LOGGER.debug('Registring, req.body: ', req.body);
  EEBookRequest(req, 'POST', '/auth/register', {'data': req.body}).then(function (result) {
    res.send({'result': result });
  }).catch(function (err) {
    return next(err);
  });
});

module.exports = router;
