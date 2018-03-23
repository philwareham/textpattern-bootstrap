const distDir = __dirname + '/dist/bootstrap_framework';

const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackOnBuildPlugin = require('on-build-webpack');
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
    resolve: {
        extensions: ['.js'],
        alias: {
            'jquery': 'jquery/dist/jquery.slim.js',
        }
    },
    plugins: [
        new CleanWebpackPlugin(__dirname +'/dist'),
        new ExtractTextPlugin({
            filename: 'assets/css/main.css',
            allChunks: true,
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Popper: ['popper.js', 'default'],
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
            sourceMap: true,
        }),
        new WebpackOnBuildPlugin(function(stats) {
            // Delete `output.filename`.
            try {
                fs.unlinkSync(this.outputPath+'/'+this.options.output.filename);
            } catch(e) {
            }

            // Auto build/repair `manifest.json` from `package.json` if some parameters are missing or `manifest.json` does not exist.
            var pkg = require(this.context+'/package.json');
            try {
                var manifest = require(this.outputPath+'/manifest.json');
            } catch(e) {
                var manifest = {};
            }

            var manifest2 = {
                "title":        manifest.title          || pkg.title        || pkg.name,
                "txp-type":     manifest['txp-type']    || pkg['txp-type']  || "textpattern-theme",
                "version":      manifest.version        || pkg.version      || "0.1.0",
                "description":  manifest.description    || pkg.description  || "",
                "author":       manifest.author         || pkg.author       || "Phil Wareham",
                "author_uri":   manifest.author_uri     || pkg.homepage     || pkg.repository.url   || ""
            };
            fs.writeFile(this.outputPath+'/manifest.json', JSON.stringify(manifest2, null, 2));
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
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { minimize: false, importLoaders: 2 } },
                        // Run postCSS actions.
                        { loader: 'postcss-loader', options: { plugins: [require('autoprefixer')] } },
                        // Compiles Sass to CSS.
                        { loader: 'sass-loader', options: { outputStyle: 'compressed', precision: 7 } } // outputStyle = nested, expanded, compact or compressed
                    ]
                })
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
