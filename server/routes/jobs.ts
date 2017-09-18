import * as express from 'express';

import { EEBookRequest } from '../common/request';
import eebookLogger from '../logger/logger';

const LOGGER = eebookLogger.logger;
const router = express.Router();

router.get('/', function(req, res, next) {
  LOGGER.debug('Get job list');
  req.user = req.session.user;
  EEBookRequest(req, 'GET', '/jobs', req).then(function (result) {
    res.send(result);
  }).catch(function (err) {
    throw err;
  });
});

router.post('/', function(req, res, next) {
  LOGGER.debug('Start a job');
});

router.get('/:job_uuid', function(req, res, next) {
  LOGGER.debug('Get a job detail');
});

router.put('/:job_uuid', function(req, res, next) {
  LOGGER.debug('Stop a job');
});

router.delete('/:job_uuid', function(req, res, next) {
  LOGGER.debug('Delete a job');
});

module.exports = router;
