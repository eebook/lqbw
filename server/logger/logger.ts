import * as pathLib from 'path';
import * as log4js from 'log4js';
import * as _ from 'lodash';
import config from '../../config';


import { default as defaultDevLogConfig } from './default_conf/log_dev.config';
import { default as defaultProdLogConfig } from './default_conf/log_prod.config';

class EEBookLogger {
    customConfig: any;
    public logger: any;

    constructor(config = {}) {
        this.customConfig = config;
        log4js.configure(this.getEnvConfig());
        this.logger = log4js.getLogger('log');
    }

    private getEnvConfig() {
        let envConfig;
        const setAppenderPath = (appender) => {
            if (appender.type === 'logLevelFilter') {
                appender.appender.filename = pathLib.join(this.customConfig.LOGDIR, appender.appender.filename);
            }
        };

        if (process.env.NODE_ENV !== 'production') {
            envConfig = _.cloneDeep(defaultDevLogConfig);
        } else {
            envConfig = _.cloneDeep(defaultProdLogConfig);
        }
        envConfig.appenders.forEach(setAppenderPath);
        return envConfig;
    }
}
const eebookLogger = new EEBookLogger(config.LOGGERCONFIG);

export default eebookLogger;
