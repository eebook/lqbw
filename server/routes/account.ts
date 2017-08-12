import * as express from 'express';

import { EEBookRequest } from '../common/request';
import eebLogger from '../logger/logger';

const logger = eebLogger.logger;
const router = express.Router();

router.post('/register', function(req, res, next) {
    logger.debug('req.body??????', req.body);

    EEBookRequest(req, 'POST', '/auth/register', {'data': req.body}).then(function (result) {
        // return { 'result': result };
        res.send({'result': result });
    }).catch(function (err) {
        throw err;
    });
});

router.post('/signin', function(req, res, next) {
    EEBookRequest(req, 'POST', '/auth/generate-api-token').then(function (result) {
        res.send('TODO: signin');
    }).catch(function (err) {
        throw err;
    });
});

module.exports = router;
