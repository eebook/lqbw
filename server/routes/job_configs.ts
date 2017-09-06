import * as express from 'express';

import { EEBookRequest } from '../common/request';
import eebookLogger from '../logger/logger';

const LOGGER = eebookLogger.logger;
const router = express.Router();

router.get('/', function(req, res, next) {
  const user = req.session.user;
  req.user = req.session.user;
  LOGGER.debug('Get job config list');
  EEBookRequest(req, 'GET', '/job_configs').then(function (result) {
    LOGGER.debug('result??????', result);
    res.send(result);
  }).catch(function (err) {
      throw err;
  });
});

module.exports = router;
