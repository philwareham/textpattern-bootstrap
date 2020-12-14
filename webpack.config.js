const distDir = __dirname + '/themes/bootstrap_framework';

const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: [
        './js/app.js',
        './scss/app.scss',
    ],
    output: {
        path: distDir,
        filename: 'assets/js/[name].js'
    },
    performance: {
        hints: false
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'assets/css/main.css'
        }),
        new webpack.ProvidePlugin({
            Popper: ['popper.js', 'default'],
            // Bootstrap scripts.
            //Util: 'exports-loader?Util!bootstrap/js/dist/util',
            Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
            Button: 'exports-loader?Button!bootstrap/js/dist/button',
            Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
            Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
            Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
            Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
            Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
            Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
            Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
            Toast: 'exports-loader?Toast!bootstrap/js/dist/toast',
            Tooltip: 'exports-loader?Tooltip!bootstrap/js/dist/tooltip'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    context: 'templates',
                    from: '**/*',
                },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader', options: { importLoaders: 2 },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')],
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                outputStyle: 'expanded',
                            },
                        },
                    },
                ],
            },
            // Bundle WOFF fonts and SVGs if provided.
            {
                test: /\.(woff(2)?|svg)$/,
                type: 'asset/inline',
            },
            // Bundle images if provided.
            {
                test: /\.(?:ico|gif|jpe?g|png|svg|webp)$/i,
                type: 'asset/resource',
            },
        ],
    },
};
