import * as express from 'express';

import { EEBookRequest } from '../common/request';
import eebookLogger from '../logger/logger';

const LOGGER = eebookLogger.logger;
const router = express.Router();


router.get('/autocomplete', function(req, res, next) {
  LOGGER.debug('Get autocomplete items');
});

router.get('/book', function(req, res, next) {
  LOGGER.debug('Search books');
  req.user = req.session.user;
  EEBookRequest(req, 'GET', '/search/book', req).then(function (result) {
    res.send(result);
  }).catch(function (err) {
    return next(err);
  });
});

module.exports = router;
