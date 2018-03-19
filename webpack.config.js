const distDir = __dirname + '/dist/bootstrap_framework';

var fs = require('fs');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackOnBuildPlugin = require('on-build-webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: [
        './js/app.js',
        './scss/app.scss',
    ],
    output: {
        path: distDir,
        filename: "js/[name].js"
    },
    plugins: [
        new CleanWebpackPlugin(__dirname +'/dist'),
        new ExtractTextPlugin({
            filename: 'styles/default.css',
            allChunks: true,
        }),
        new CopyWebpackPlugin([
            {
                context: 'templates',
                from: '**/*',
            }
        ]),
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
                    loader: "babel-loader"
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
                    loader: "url-loader",
                    options: {
                        // Limit at 50k. Above that it emits separate files.
                        limit: 50000,
                        mimetype: "application/font-woff",
                        // Output below fonts directory
                        name: "./fonts/[name].[ext]",
                    }
                }
            },


            {
                // Bundle images.
                test: /\.(gif|jpe?g|png|svg|webp)$/i,
                use: {
                    loader: "file-loader"
                },
            },


        ]
    }
};
