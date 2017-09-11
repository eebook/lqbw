import * as express from 'express';

import { EEBookRequest } from '../common/request';
import eebookLogger from '../logger/logger';

const LOGGER = eebookLogger.logger;
const router = express.Router();

router.get('/', function(req, res, next) {
  LOGGER.debug('Get job config list');
  req.user = req.session.user;
  EEBookRequest(req, 'GET', '/job_configs', req).then(function (result) {
    res.send(result);
  }).catch(function (err) {
      throw err;
  });
});

module.exports = router;
