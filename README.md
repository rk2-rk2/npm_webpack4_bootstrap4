# Simple npm project for bootstrap 4

Example Bootstrap4 project with npm and webpack4

## How to run it

Type npm start to start building and opening index.html

```shell
npm start
```

![image](https://user-images.githubusercontent.com/11747460/65374306-80d9c680-dcc3-11e9-9272-c935dde8fd43.png)

## package.json

```json
{
  "name": "npm_webpack4_bootstrap4",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack-dev-server",
    "start:dev": "webpack-dev-server",
    "start:prd": "set NODE_ENV=test&&webpack-dev-server --config webpack.config.js --mode production",
    "build:dev": "webpack --config webpack.config.js",
    "build:prd": "set NODE_ENV=test&&webpack --config webpack.config.js --mode production"
  },
  "author": "Tom Misawa <riversun.org@gmail.com> (https://github.com/riversun)",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/riversun/npm_webpack4_bootstrap4.git"
  },
  "bugs": {
    "url": "https://github.com/riversun/npm_webpack4_bootstrap4/issues"
  },
  "homepage": "https://github.com/riversun/npm_webpack4_bootstrap4#readme",
  "devDependencies": {
    "@babel/core": "^7.6.0",
    "@babel/preset-env": "^7.6.0",
    "babel-loader": "^8.0.6",
    "core-js": "^3.2.1",
    "css-loader": "^3.2.0",
    "mini-css-extract-plugin": "^0.8.0",
    "node-sass": "^4.12.0",
    "sass-loader": "^8.0.0",
    "style-loader": "^1.0.0",
    "url-loader": "^2.1.0",
    "webpack": "^4.40.2",
    "webpack-cli": "^3.3.9",
    "webpack-dev-server": "^3.8.1"
  },
  "dependencies": {
    "bootstrap": "^4.3.1",
    "jquery": "^3.4.1",
    "popper.js": "^1.15.0"
  }
}


```

## index.js

```js
import "bootstrap";
import "./index.scss";


```

## index.scss

```scss
// padding for fixed nav-bar
body {
  padding-top: 70px;
}

// padding for tab content
.tab-content {
  background-color: transparent;
  padding-top: 10px;
}

//customize bootstrap theme
$theme-colors: (
        dark: #999999
);

//import boostrap's scss
@import "~bootstrap/scss/bootstrap.scss";
```

## webpack.config.js

```js
const packageJson = require('./package.json');
const version = packageJson.version;
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
                        'css-loader',
                        'sass-loader',
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
                jQuery: "jquery",
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

```
## npm modules

You can install npm modules manually.

```shell
npm install --save-dev @babel/core @babel/preset-env babel-loader core-js css-loader style-loader url-loader mini-css-extract-plugin node-sass sass-loader webpack webpack-cli webpack-dev-server
npm install bootstrap jquery popper.js
```
