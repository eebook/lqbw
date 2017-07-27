/**
 * config
 */

 var path = require('path');

 var config = {
     debug: true,

     // The port that the program runs.
     port: 3001,
     // Domain name
     host: 'localhost',

     // config for github.
     GITHUB_OAUTH: {
         clientID: 'GITHUB_CLIENT_ID',
         clientSecret: 'GITHUB_CLIENT_SECRET',
         callbackURL: 'http://localhost:3001/auth/github/callback'
     },

     API_SERVER_URL: 'http://localhost:8082/',
     API_VERSION: 'v1',

     log_dir: path.join(__dirname, 'logs'),

     // Otherwise, you can only login with github.
     allow_sign_up: true,
 }

 module.exports = config;

 export {config}