const prod_config = {
  appenders: [
    {
      type: 'logLevelFilter',
      level: 'DEBUG',
      maxLevel: 'DEBUG',
      category: ['log'],
      appender: {
        type: 'file',
        filename: 'lqbw.debug.log',
        maxLogSize: 1024 * 1024 * 50,
        backups: 2,
      },
    },
    {
      type: 'logLevelFilter',
      level: 'ERROR',
      maxLevel: 'ERROR',
      category: ['log'],
      appender: {
        type: 'file',
        filename: 'lqbw.error.log',
        maxLogSize: 1024 * 1024 * 10,
        backups: 2,
      },
    },
    {
      type: 'logLevelFilter',
      level: 'INFO',
      category: ['access', 'log'],
      appender: {
        type: 'file',
        filename: 'lqbw.access.log',
        maxLogSize: 1024 * 1024 * 10,
        backups: 2,
      },
    },
  ],
};
export default prod_config;
