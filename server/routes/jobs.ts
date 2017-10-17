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
    return next(err);
  });
});

router.post('/', function(req, res, next) {
  LOGGER.debug('Start a job');
  EEBookRequest(req, 'POST', '/jobs/', {'data': req.body}).then(function (result) {
    res.send({'result': result });
  }).catch(function (err) {
    return next(err);
  });
});

router.get('/:job_uuid', function(req, res, next) {
  LOGGER.debug('Get a job detail');
  EEBookRequest(req, 'GET', '/jobs/' + req.params.job_uuid + '/', req).then(function (result) {
    res.send(result);
  }).catch(function (err) {
    return next(err);
  });
});

router.put('/:job_uuid', function(req, res, next) {
  LOGGER.debug('TODO: Stop a job');
});

router.delete('/:job_uuid/', function(req, res, next) {
  LOGGER.debug('Delete a job');
  EEBookRequest(req, 'DELETE', '/jobs/' + req.params.job_uuid + '/', req).then(function (result) {
    res.send(result);
  }).catch(function (err) {
    return next(err);
  });
});

router.get('/:job_uuid/logs/', function(req, res, next) {
  LOGGER.debug('Get job logs');
  EEBookRequest(req, 'GET', '/jobs/' + req.params.job_uuid + '/logs/', req).then(function (result) {
    res.send(result);
  }).catch(function (err) {
    return next(err);
  });
});

module.exports = router;
