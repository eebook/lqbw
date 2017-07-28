import * as pathLib from 'path';
import * as log4js from 'log4js';
import * as lodash from 'lodash';

import config from '../../config';


const defaultDevLogConfig = require('./default_conf/dev.json')
const defaultProdLogConfig = require('./default_conf/prod.json')

class EEBookLogger {
    customConfig: any;
    public logger: any;
    constructor(config = {}) {
        this.customConfig = config;
        log4js.configure(this.getEnvConfig())
        this.logger = log4js.getLogger('log')
    }

    private getEnvConfig() {
        let envConfig;
        const setAppenderPath = (appender) => {
            if (appender.type === 'logLevelFilter') {
                appender.appender.filename = pathLib.join(this.customConfig.LOGDIR, appender.appender.filename);
            }
        }

        if (process.env.NODE_ENV !== 'production') {
            envConfig = lodash.cloneDeep(defaultDevLogConfig);
        } else {
            envConfig = lodash.cloneDeep(defaultProdLogConfig);
        }
        envConfig.appenders.forEach(setAppenderPath);
        return envConfig
    }
}
const eebookLogger = new EEBookLogger(config.LOGGERCONFIG)

export default eebookLogger;
