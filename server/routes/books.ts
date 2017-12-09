import * as express from 'express';

import { EEBookRequest } from '../common/request';
import eebookLogger from '../logger/logger';

const LOGGER = eebookLogger.logger;
const router = express.Router();


router.get('/detail/:book_id', function(req, res, next) {
  LOGGER.debug('Get detail of a book');
  req.user = req.session.user;
  EEBookRequest(req, 'GET', '/books/detail/' + req.params.book_id + '/', req).then(function (result) {
    res.send(result);
  }).catch(function (err) {
    return next(err);
  });
});

router.delete('/detail/:book_id', function(req, res, next) {
  LOGGER.debug('Delete a books');
  req.user = req.session.user;
  EEBookRequest(req, 'DELETE', '/books/detail/' + req.params.book_id + '/', req).then(function (result) {
    res.send(result);
  }).catch(function (err) {
    return next(err);
  });
});

router.put('/detail/:book_id', function(req, res, next) {
  LOGGER.debug('Update books permission');
  req.user = req.session.user;
  EEBookRequest(req, 'PUT', '/books/detail/' + req.params.book_id + '/', {data: req.body}).then(function (result) {
    res.send(result);
  }).catch(function (err) {
    return next(err);
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
