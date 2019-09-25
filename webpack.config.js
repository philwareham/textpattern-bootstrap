const distDir = __dirname + '/themes/bootstrap_framework';

const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: [
        './js/app.js',
        './scss/app.scss',
    ],
    output: {
        path: distDir,
        filename: "assets/js/[name].js"
    },
    performance: {
        hints: false
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            'jquery': 'jquery/dist/jquery.slim.js',
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'assets/css/main.css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Popper: ['popper.js', 'default'],
            // Bootstrap scripts.
            Util: 'exports-loader?Util!bootstrap/js/dist/util',
            Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
            Button: 'exports-loader?Button!bootstrap/js/dist/button',
            Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
            Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
            Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
            Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
            Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
            Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
            Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
            Tooltip: 'exports-loader?Tooltip!bootstrap/js/dist/tooltip'
        }),
        new CopyWebpackPlugin([
            {
                context: 'templates',
                from: '**/*',
            }
        ]),
        new UglifyJsPlugin({
            // Minify and optimise JavaScript.
            uglifyOptions: {
                output: {
                    comments: false,
                    beautify: false
                }
            }
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS modules.
                    { loader: 'css-loader', options: { importLoaders: 2 } },
                    // Run postCSS actions.
                    { loader: 'postcss-loader', options: { plugins: [require('autoprefixer')] } },
                    // Compiles Sass to CSS.
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                outputStyle: 'expanded'
                            }
                        }
                    }
                ]
            },
            {
                // Bundle WOFF fonts if provided.
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // Limit at 50k. Above that it emits separate files.
                        limit: 50000,
                        mimetype: 'application/font-woff',
                        // Output below fonts directory
                        name: './fonts/[name].[ext]',
                    }
                }
            },
            {
                // Bundle images.
                test: /\.(gif|jpe?g|png|svg|webp)$/i,
                use: {
                    loader: 'file-loader'
                },
            },
            {
                // Bundle jQuery, as it's required for Bootstrap functionality.
                test: /bootstrap\/js\//, use: 'imports-loader?jQuery=jquery'
            },
        ]
    }
};
