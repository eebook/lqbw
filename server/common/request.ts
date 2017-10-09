import * as request from 'request-promise';
import * as _ from 'lodash';
import ENVVARS from '../env';
import eebLogger from '../logger/logger';

const logger = eebLogger.logger;

export function Request(option) {
    return request(option).then(function (res) {
        // logger.debug('Request result: ' + JSON.stringify(res));
        // logger.debug(`requesting, method: ${option.method}, url: ${option.url}` +
        // `, headers: ${JSON.stringify(option.headers)} result: ${JSON.stringify(res)} `);
        console.log('WTF???');
        return res;
    }).catch(function (err) {
        logger.debug('Request got err...');
        logger.error(`requesing, method: ${option.method}, url: ${option.url}` +
        `, headers: ${JSON.stringify(option.headers)} error: ${err.statusCode} error json: ${JSON.stringify(err)} `);
        throw err;
    });
}

export function EEBookRequest(ctx: any, method, path, args?) {
    const option = {
        url: ENVVARS['API_URL'] + ENVVARS['API_VERSION'] + path,
        json: true,
        headers: {
            'User-Agent': 'eebookorg/v1.0',
            'Content-Type': 'application/json'
        },
        method: method,
        qs: _.get(args, 'query'),
        useQuerystring: false
    };

    if (_.get(ctx, 'session.user')) {
        option.headers['Authorization'] = `TOKEN ${_.get(ctx.session, 'user.token')}`;
    }

    if (_.get(args, 'data')) {
        option['body'] = args.data;
    }
    logger.debug('Request option:', option);
    return Request(option);
}
