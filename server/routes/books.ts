import * as express from 'express';

import { EEBookRequest } from '../common/request';
import eebookLogger from '../logger/logger';

const LOGGER = eebookLogger.logger;
const router = express.Router();


router.get('/detail/:book_id', function(req, res, next) {
  LOGGER.debug('Search books');
  req.user = req.session.user;
  EEBookRequest(req, 'GET', '/books/detail/' + req.params.book_id + '/', req).then(function (result) {
    res.send(result);
  }).catch(function (err) {
    throw err;
  });
});

router.get('/', function(req, res, next) {
  LOGGER.debug('List books');
  req.user = req.session.user;
  EEBookRequest(req, 'GET', '/books/?page_size=1000', req).then(function (result) {
    res.send(result);
  }).catch(function (err) {
    throw err;
  });
});

module.exports = router;
