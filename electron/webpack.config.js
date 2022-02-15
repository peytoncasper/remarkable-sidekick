const lodash = require('lodash');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const {IgnorePlugin} = require("webpack");

function srcPaths(src) {
    return path.join(__dirname, src);
}

const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = process.env.NODE_ENV === 'development';

const isArm = process.env.NODE_ARCH === 'arm64';

// #region Common settings
const commonConfig = {
    devtool: isEnvDevelopment ? 'source-map' : false,
    mode: isEnvProduction ? 'production' : 'development',
    output: { path: srcPaths('build') },
    node: { __dirname: false, __filename: false },
    optimization: {
        minimize: false
    },
    externals: isArm ? {
        sharp: 'commonjs sharp'
    } : {},
    resolve: {
        alias: {
            _: srcPaths('src'),
            _main: srcPaths('src/main'),
            _models: srcPaths('src/models'),
            _public: srcPaths('public'),
            _renderer: srcPaths('src/renderer'),
            _utils: srcPaths('src/utils'),
            _assets: srcPaths("src/assets")
        },
        extensions: ['.js', '.json', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(woff|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            },
            {
                test: /\.(jpg|gif|png|svg|ico|icns|t)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
            {
                test: /\.node$/,
                loader: "node-loader",
            },
        ],
    },
};
// #endregion

const mainConfig = lodash.cloneDeep(commonConfig);
mainConfig.entry = './src/main/main.ts';
mainConfig.target = 'electron-main';
mainConfig.output.filename = 'main.bundle.js';
mainConfig.plugins = [
    new CopyPlugin({
        patterns: [{
            from: "src/assets/default_remarkable_lockscreen.png",
            to: "default_remarkable_lockscreen.png"
        }]
    }),
    new CopyPlugin({
        patterns: [{
            from: "public/loading.html",
            to: "loading.html"
        }]
    }),
    new CopyPlugin({
        patterns: [{
            from: "src/renderer/static/icon.png",
            to: "icon.png"
        }]
    }),
    new CopyPlugin({
        patterns: [{
            from: "src/renderer/static/favicon.ico",
            to: "favicon.ico"
        }]
    }),
    new CopyPlugin({
        patterns: [
            {
                from: 'package.json',
                to: 'package.json',
                transform: (content, _path) => { // eslint-disable-line no-unused-vars
                    const jsonContent = JSON.parse(content);

                    delete jsonContent.devDependencies;
                    delete jsonContent.scripts;
                    delete jsonContent.build;

                    jsonContent.main = './main.bundle.js';
                    jsonContent.scripts = { start: 'electron ./main.bundle.js' };
                    jsonContent.postinstall = 'electron-builder install-app-deps';

                    return JSON.stringify(jsonContent, undefined, 2);
                },
            },
        ],
    }),
];

const preloadConfig = lodash.cloneDeep(commonConfig);
preloadConfig.entry = './src/main/preload.js';
preloadConfig.target = 'electron-preload';
preloadConfig.output.filename = 'preload.bundle.js';


const rendererConfig = lodash.cloneDeep(commonConfig);
rendererConfig.entry = './src/renderer/index.tsx';
rendererConfig.target = 'electron-renderer';
rendererConfig.output.filename = 'renderer.bundle.js';
rendererConfig.plugins = [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
    }),
];

module.exports = [mainConfig, rendererConfig, preloadConfig];
