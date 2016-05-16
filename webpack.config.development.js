/* eslint max-len: 0 */
import webpack from 'webpack';
import baseConfig from './webpack.config.base';

var autoprefixer = require('autoprefixer');

const config = {
    ...baseConfig,

    debug: true,

    devtool: 'cheap-module-eval-source-map',

    entry: [
        'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
        './app/index'
    ],

    output: {
        ...baseConfig.output,
        publicPath: 'http://localhost:3000/dist/'
    },

    module: {
        ...baseConfig.module,
        loaders: [
            ...baseConfig.module.loaders,

            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'postcss', 'sass']
            }
        ]
    },

    postcss: [autoprefixer({ browsers: ['> 5%', 'IE 10-11'] })],

    plugins: [
        ...baseConfig.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            __DEV__: true,
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ],

    target: 'electron-renderer'
};

export default config;
