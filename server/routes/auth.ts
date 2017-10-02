import * as express from 'express';
import passport from '../auth/github';
import eebLogger from '../logger/logger';
const cors = require('cors');

const logger = eebLogger.logger;

const router = express.Router();

router.get('/github', cors(), passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
function(req, res, next) {
        // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  logger.debug('?????');
  const result = {
      'email': 'knarfeh@outlook.com',
      'token': '5cf675c6af81ac404e3494c69c6d30ddd0df6246',
      'username': 'knarfehsss'
  };
  res.send({'result': result});
});

module.exports = router;
