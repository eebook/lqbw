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

router.post('/', function(req, res, next) {
  LOGGER.debug('Create job config');
});

router.get('/:config_name', function(req, res, next) {
  LOGGER.debug('Get job config details');
  EEBookRequest(req, 'GET', '/job_configs/' + req.params.config_name, req).then(function (result) {
    res.send(result);
  }).catch(function (err) {
    throw err;
  });
});

router.delete('/:config_name', function(req, res, next) {
  LOGGER.debug('Delete job config');
  EEBookRequest(req, 'DELETE', '/job_configs/' + req.params.config_name, req).then(function (result) {
    res.send(result);
  }).catch(function (err) {
    throw err;
  });
});

router.put('/:config_name', function(req, res, next) {
  LOGGER.debug('Update job config');
  LOGGER.debug('TODO');
});

module.exports = router;
