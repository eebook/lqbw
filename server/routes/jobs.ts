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
  LOGGER.debug('req.body??', req.body);
  EEBookRequest(req, 'POST', '/jobs/', {'data': req.body}).then(function (result) {
    res.send({'result': result });
  }).catch(function (err) {
    throw err;
  });
});

router.get('/:job_uuid', function(req, res, next) {
  LOGGER.debug('Get a job detail');
});

router.put('/:job_uuid', function(req, res, next) {
  LOGGER.debug('Stop a job');
});

router.delete('/:job_uuid', function(req, res, next) {
  LOGGER.debug('Delete a job');
  EEBookRequest(req, 'DELETE', '/jobs/' + req.params.job_uuid, req).then(function (result) {
    res.send(result);
  }).catch(function (err) {
    return next(err);
  });
});

module.exports = router;
