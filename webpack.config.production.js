import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import baseConfig from './webpack.config.base';

const autoprefixer = require('autoprefixer');

const config = {
    ...baseConfig,

    devtool: 'source-map',

    entry: './app/index',

    output: {
        ...baseConfig.output,

        publicPath: '../dist/'
    },

    module: {
        ...baseConfig.module,

        loaders: [
            ...baseConfig.module.loaders,

            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    "style",
                    "css?sourceMap!postcss!sass?sourceMap"
                )
            }
        ]
    },

    postcss: [autoprefixer({ browsers: ['> 5%', 'IE 10-11'] })],

    plugins: [
        ...baseConfig.plugins,
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            __DEV__: false,
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                screw_ie8: true,
                warnings: false
            }
        }),
        new ExtractTextPlugin('style.css', { allChunks: true })
    ],

    target: 'electron-renderer'
};

export default config;
