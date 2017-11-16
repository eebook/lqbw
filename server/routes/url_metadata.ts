import * as express from 'express';

import { EEBookRequest } from '../common/request';
import eebookLogger from '../logger/logger';

const LOGGER = eebookLogger.logger;
const router = express.Router();

router.post('/', function(req, res, next) {
  LOGGER.debug('Get metadata of a url???%j', req.body);
  EEBookRequest(req, 'POST', '/url_metadata', {'data': req.body}).then(function (result) {
    res.send({'result': result });
  }).catch(function (err) {
    return next(err);
  });
});

module.exports = router;
