const { resolve } = require('path');
const { dependencies } = require('./package.json');
const BabiliPlugin = require("babili-webpack-plugin");

const nodeModules = {};

Object
    .keys(dependencies)
    .forEach((mod) => {
     nodeModules[mod] = `commonjs ${mod}`;
    });

module.exports = (env = { dev: true }) => ({
    context: resolve(__dirname, './'),
    entry: {
     server: env.prod ? './dist/index.js' : ['webpack/hot/poll?1000', './dist/index.js']
    },
    target: 'node',
    output: {
     filename: '[name].js',
     path: resolve(__dirname, './build'),
     pathinfo: !env.prod
    },
    devtool: env.prod ? 'source-map' : 'eval',
    // module: {
    //  loaders: [
    //    {
    //      test: /\.js$/,
    //      exclude: /node_modules/,
    //      loaders: [
    //        'babel-loader'
    //      ]
    //    }
    //  ]
    // },
    // plugins: env.prod ? [
    //   new BabiliPlugin()
    // ] : [],
    externals: nodeModules
});
