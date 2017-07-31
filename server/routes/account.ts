import * as express from 'express';

import { EEBookRequest } from '../common/request';
import eebLogger from '../logger/logger';

const logger = eebLogger.logger;
const router = express.Router();

router.post('/signup', function(req, res, next) {
    EEBookRequest(req, 'POST', '/auth/register').then(function (result) {
        res.send('TODO: signup');
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
