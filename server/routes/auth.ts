import * as express from 'express';
import passport from '../auth/github';
import eebLogger from '../logger/logger';
const cors = require('cors');

const logger = eebLogger.logger;

const router = express.Router();

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/register' }),
function(req, res, next) {
  logger.debug('???????');
  res.redirect('/');
});

module.exports = router;
