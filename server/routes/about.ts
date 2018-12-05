import * as express from 'express';

import { EEBookRequest } from '../common/request';
import eebookLogger from '../logger/logger';

const LOGGER = eebookLogger.logger;
const router = express.Router();


router.get('/', function(req, res, next) {
  LOGGER.debug('Get about info');
  req.user = req.session.user;
  EEBookRequest(req, 'GET', '/about/', req).then(function (result) {
    res.send(result);
  }).catch(function (err) {
    return next(err);
  });
});

module.exports = router;
