const packageJson = require('./package.json');
const version = packageJson.version;
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AutoPrefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {

    const conf = {
        mode: 'development',
        devServer: {
            open: true,
            openPage: 'index.html',
            contentBase: path.join(__dirname, 'public'),
            watchContentBase: true,
            port: 8080,
            host: argv.mode === 'production' ? `localhost` : `localhost`,// 0.0.0.0
            disableHostCheck: true,
        },
        entry: {app: './src/index.js'},
        output: {
            path: path.join(__dirname, 'dist'),
            publicPath: '/js/',
            filename: argv.mode === 'production' ? `[name].js` : `[name].js`,  //`[name].min.js`
            library: ['com', 'example'],
            libraryTarget: 'umd'
        },

        optimization: {
            minimizer: [new TerserPlugin({
                //extractComments: true,
                //cache: true,
                //parallel: true,
                //sourceMap: true,
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                }

            })],
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    [
                                        '@babel/preset-env',
                                        {
                                            'modules': 'false',//commonjs,amd,umd,systemjs,auto
                                            'useBuiltIns': 'usage',
                                            'targets': '> 0.25%, not dead',
                                            'corejs': 3
                                        }
                                    ]
                                ]
                            }
                        }
                    ],
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: process.env.NODE_ENV === 'development',
                            },
                        },
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    AutoPrefixer(
                                        {
                                            grid: 'autoplace'
                                        },
                                    ),
                                ],
                            },
                        },
                        {
                            loader: 'sass-loader',
                        }
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        {loader: 'style-loader'},
                        {loader: 'css-loader'},
                    ]
                },
                {
                    test: /\.(png|jpg|gif)$/i,
                    use: [
                        {loader: 'url-loader'},
                    ]
                },
            ],
        },
        resolve: {
            alias: {}
        },
        plugins: [
            new webpack.BannerPlugin(`[name] v${version} Copyright (c) 2019 Your Name`),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            }),
            new MiniCssExtractPlugin({
                filename: argv.mode === 'production' ? `[name].css` : `[name].css`,  //`[name].min.js`
            }),
        ],

    };

    if (argv.mode !== 'production') {
        conf.devtool = 'inline-source-map';
    }

    return conf;

};