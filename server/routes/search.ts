import * as express from 'express';

import { EEBookRequest } from '../common/request';
import eebookLogger from '../logger/logger';

const LOGGER = eebookLogger.logger;
const router = express.Router();


router.get('/autocomplete', function(req, res, next) {
  LOGGER.debug('Get autocomplete items');
});

router.get('/search', function(req, res, next) {
  LOGGER.debug('Get search result');
});

module.exports = router;
