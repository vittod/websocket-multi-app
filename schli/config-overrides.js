const TerserPlugin = require('terser-webpack-plugin');

module.exports = function override(config, env) {
    config.output.jsonpFunction = 'jsonpSchli';

    return config;
};
