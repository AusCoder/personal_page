/* eslint-disable */
// setting the enviro variable NODE_ENV to production turns off various devtools (eg logging) and turns on various optimizations

var DEBUG = process.env.DEBUG;
var webpack = require('webpack');
var path = require('path');


// path.resolve concats its string arguments together to form an absolute path,
// if left most string is not absolute, it uses the cwd of where the script was run
var SCRIPTS_ROOT = path.resolve(__dirname, "./scripts");
var STYLES_ROOT = path.resolve(__dirname, "./styles");

module.exports = {
    context: __dirname,
    debug: DEBUG,
    devtool: DEBUG ? "inline-sourcemap": null,
    entry: path.resolve(SCRIPTS_ROOT, "client.js"),
    module: {
        // loaders tell webpack how to process different file types
        loaders: [
            {
                test: /\.(jsx?|es6)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        'es2015', 'stage-0'
                    ],
                    plugins: ['transform-class-properties', 'transform-decorators-legacy']
                    // optional: DEBUG ? ["runtime"] : [
                    //   "optimisation.react.inlineElements",
                    //   "optimisation.react.constantElements",
                    //   "runtime"
                    // ]
                }
            },
            {
                test: /\.css$/,
                // these are style-loader, css-loader and sass-loader
                // you might have to use
                // require(!style!css!sass!./path/to/stylesheet)
                // when importing (the !s are like pipes)
                loaders: [ 'style', 'css?sourceMap', 'sass?sourceMap' ]
            },
            {
                // these are loaders for fonts, graphics and other such things (including font-awesome)
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // the name param tells the css where to find the text files on the server, so put your public folder
                loader: "url?name=./fonts_imgs/[name].[ext]&limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file?name=./fonts_imgs/[name].[ext]"
            },
            {
              test: /\.json$/,
              loader: "json"
            },
            {
              test: /\.txt$/,
              loader: "raw"
            }
        ]
    },
    // this is the output directory for the webpack file
    output: {
        path: __dirname + "/public/",
        filename: "client.min.js",
        pathinfo: DEBUG
    },
    // tell webpack how to resolve import statements
    resolve: {
        extensions: ["", ".js", ".jsx", ".es6", ".txt"],
        alias: {
            "pw-scripts": SCRIPTS_ROOT,
            "pw-styles": STYLES_ROOT,
            // here we can include specific mappings which tell webpack where to look if a module doesn't default export something we want. We do this with
            // "bootstrap$": "bootstrap/dist/js/bootstrap.min",
            "debug$": "debug/browser"
        }
    },
    plugins: [
        // ProvidePlugin automatically imports a module when it is referenced in a file
        new webpack.ProvidePlugin({
            React: "react",
            $: "jquery",
            jQuery: "jquery"
        })
    ].concat(DEBUG
        ? []
        : [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
        ]
    )
};
