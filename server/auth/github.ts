import * as passport from 'passport';
import eebLogger from '../logger/logger';
import { EEBookRequest } from '../common/request';
const logger = eebLogger.logger;
const GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
  clientID: 'd14320cfeb8f9c399e59',
  clientSecret: '742a41574bbecad5bcb5af6852878834ce33038e',
  callbackURL: 'http://localhost:18084/auth/github/callback',
  passReqToCallback: true
},
function(req, accessToken, refreshToken, profile, done) {
  logger.debug('accessToken???%s', accessToken);
  logger.debug('refreshtoken???%s', refreshToken);
  logger.debug('profile???%j', profile);
  req.session.regenerate(function(err) {
    if (err) {
      logger.debug('????');
    }
    if (!req.session.user) {
      req.session.user = {};
    }
    req.session.user['username'] = 'knarfeh';
    req.session.user['token'] = '5cf675c6af81ac404e3494c69c6d30ddd0df6246';
  });
  process.nextTick(function () {
    return done(null, profile);
  });
}
));

export default passport;

