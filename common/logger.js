var config = require('../config');
var pathLib = require('path')

var env = process.env.NODE_ENV || "development"


var log4js = require('log4js');
log4js.configure({
    appenders: { 
        'eebook': { type: 'file', filename: pathLib.join(config.log_dir, 'eebook.log') }, 
        'out': { type: 'stdout' } 
    },
    categories: { default: { appenders: ['out', 'eebook'], level: 'debug' } }
});

var logger = log4js.getLogger('eebook');
logger.level = (config.debug && env != 'test' ? 'DEBUG' : 'ERROR')

module.exports = logger;