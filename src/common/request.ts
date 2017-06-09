let request=require('request-promise');
import * as _ from 'lodash';
import ENV_VARS from '../env';

let debug = require('request-debug')
request.debug = true;
debug(request);

export function Request(options) {
    return request(options).then(function (res) {
        return res;
    }).catch(function (err) {
        throw err;
    });
}

export function APIRequest(ctx:any, method, path, args?) {
    let option = {
        url: ENV_VARS['API_SERVER_URL'] + 'v1' + path,
        json: true,
        headlers: {
            'User-Agent': 'eebookorg/v1.0'
        },
        method,
        qs: _.get(args, 'query'),
        useQuerystring: true
    };

    if (_.get(ctx, 'user.token')) {
        option.headers['Authorization'] = `Token $(_.get(ctx.session, 'user.token')}`;
    }

    if (_.get(args, 'data')) {
        option['body'] = args.data;
    }

    return Request(option)
}