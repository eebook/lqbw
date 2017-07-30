/**
 * config for eebook.org
 * TODO: load some sensitive environment variables from env file
 */

const PATH = require('path');
const EEBOOK_COMPONENT = 'eebookorg';

const config = {
    DEBUG: true,

    SESSIONCONF: {
        KEY: 'eebook:sess', /** (string) cookie key (default: eebook:sess */
        MAXAGE: 86400000, /** (number) maxAge in ms (default: 1 day) */
        OVERWRITE: true, /** (boolean) can overWrite or not (default: true) */
        HTTPONLY: true, /** (boolean) httpOnly or not (default: true) */
    },

    STATICCONF: __dirname + '/public',

    // The port that the program runs.
    PORT: 3001,
    // Domain name
    HOST: 'localhost',

    // config for github.
    GITHUB_OAUTH: {
        clientID: 'GITHUB_CLIENT_ID',
        clientSecret: 'GITHUB_CLIENT_SECRET',
        callbackURL: 'http://localhost:3001/auth/github/callback'
    },

    API_SERVER_URL: 'http://localhost:8082/',
    API_VERSION: 'v1',

    LOGGERCONFIG:  {
        LOGDIR: PATH.join(__dirname, EEBOOK_COMPONENT)
    },

    // Otherwise, you can only login with github.
    ALLOW_SIGN_UP: true,
}

export default config;
