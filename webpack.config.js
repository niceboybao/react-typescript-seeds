var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var StringReplacePlugin = require("string-replace-webpack-plugin");
var loaderUtils = require("loader-utils");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var CompressionPlugin = require("compression-webpack-plugin");
const {
    CheckerPlugin
} = require('awesome-typescript-loader');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.NODE_ENV;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'production';

/**
 * Detect if run with webpack-dev-server or only do webpack build
 */
var isDevServer = false;
var argvs = process.argv;
if (argvs !== undefined && argvs !== null) {
    for (var i = 0; i < argvs.length; i++) {
        if (argvs[i].includes("webpack-dev-server")) {
            isDevServer = true;
            break;
        }
    }
}

/**
 * OS Platform
 * Decide browser name for open browser automatic
 */
var isWin = /^win/.test(process.platform);
var isOSX = /^darwin/.test(process.platform);
var browserName = isWin ? 'chrome' : isOSX ? 'google chrome' : 'google-chrome';

var basePlugins = [
    new webpack.DllReferencePlugin({
        manifest: require(__dirname + '/dll/vendor-manifest.json'),
    }),
    new StringReplacePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: isProd ? 'scripts/common.[hash].bundle.js' : 'scripts/common.bundle.js',
        minChunks(module, count) {
            var context = module.context;
            return (context && context.indexOf('node_modules') >= 0) || (count >= 2);
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: "manifest",
        minChunks: Infinity
    }),
    new AddAssetHtmlPlugin({
        filepath: path.resolve(__dirname, './dll/*.js'),
        outputPath: './scripts',
        publicPath: './scripts',
        includeSourcemap: false
    }),
    new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: isProd ? {
            removeComments: true,
            collapseBooleanAttributes: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            preserveLineBreaks: true
        } : {},
        inject: false
    }),
    new ExtractTextPlugin({
        filename: isProd ? "css/[name].[contenthash].bundle.css" : "css/[name].bundle.css",
        allChunks: true
    }),
    new CopyWebpackPlugin([{
        from: './src/mock',
        to: 'mock'
    }]),
    new webpack.EnvironmentPlugin(['NODE_ENV'])
];

var devPlugins = [
    new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false
    })
];

var devPluginsForWebpackDevServer = [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({
        url: 'http://localhost:8384/www/',
        browser: browserName
    }),
    new DashboardPlugin()
];

var prodPlugins = [
    new webpack.DefinePlugin({
        "process.env": {
            // This has effect on the react lib size
            "NODE_ENV": JSON.stringify("production")
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        output: {
            comments: false,
        },
        exclude: [/\.min\.js$/gi] // skip pre-minified libs
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
];

var prodPluginsForWebpackDevServer = [
    new OpenBrowserPlugin({
        url: 'http://localhost:8384/www/',
        browser: browserName
    }),
    new DashboardPlugin()
];

var webpackConfig = {
    entry: isProd ? {
        app: ["./src/app.tsx"]
    } : {
        // app: ['webpack-dev-server/client?http://0.0.0.0:8384', 'webpack/hot/only-dev-server', './src/app.tsx']
        app: ["react-hot-loader/patch", "./src/app.tsx"]
    },
    output: {
        path: __dirname + "/www",
        publicPath: './',
        filename: isProd ? 'scripts/[name].[hash].bundle.js' : 'scripts/[name].bundle.js',
        chunkFilename: isProd ? 'scripts/[id].[name].[chunkhash].chunk.js' : 'scripts/[id].[name].chunk.js',
        sourceMapFilename: '[file].map',
        pathinfo: isProd ? false : true
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: isProd ? "nosources-source-map" : "cheap-module-eval-source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                // loaders: ["babel-loader", "ts-loader"],
                use: [
                    'cache-loader',
                    {
                        loader: StringReplacePlugin.replace({
                            replacements: [{
                                pattern: /_import\(/ig,
                                replacement: function(match, p1, offset, string) {
                                    return 'import(';
                                }
                            }]
                        })
                    },
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            "configFileName": "src/tsconfig.json"
                        }
                    },
                ],
                include: path.join(__dirname, 'src')
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                // CSS LOADER
                // Reference: https://github.com/webpack/css-loader
                // Allow loading css through js
                //
                // Reference: https://github.com/postcss/postcss-loader
                // Postprocess your css with PostCSS plugins
                test: /\.css$/,
                use: isTest ? 'null' : ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?sourceMap'],
                    publicPath: "../"
                })
            },
            {
                // ASSET LOADER
                // Reference: https://github.com/webpack/url-loader
                // Copy png, jpg, jpeg, gif, woff, woff2, ttf, eot files to output
                // Rename the file using the asset hash
                // Pass along the updated reference to your code
                // You can add here any file extension you want to get copied to your output
                test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|otf|ttf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: isProd ? '[path][name].[hash].[ext]' : '[path][name].[ext]'
                    }
                }]
            },
            {
                // optimize svg load
                test: /\.svg$/,
                use: [
                    'cache-loader',
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: isProd ? '[path][name].[hash].[ext]' : '[path][name].[ext]'
                        }
                    }, {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [{
                                    removeEditorsNSData: true
                                },
                                {
                                    removeUnknownsAndDefaults: true
                                }
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: isTest ? ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'cache-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: true,
                                localIdentName: '[path]__[name]__[local]__[hash:base64:5]',
                                getLocalIdent: (context, localIdentName, localName, options) => {
                                    // console.log("getLocalIdent : " + context + " " + localIdentName +
                                    //     " " + localName + " " + options);
                                    // console.log("getLocalIdent : " + context.resourcePath + " " + context.resource +
                                    //     " " + options.context);
                                    switch (localName.substr(0, 4)) {
                                        case "ant-":
                                            // console.log("ant-: " + localName);
                                            return localName;
                                        default:
                                            if (!options.context)
                                                options.context = context.options && typeof context.options.context === "string" ? context.options.context : context.context;
                                            var request = path.relative(options.context, context.resourcePath);
                                            options.content = options.hashPrefix + request + "+" + localName;
                                            localIdentName = localIdentName.replace(/\[local\]/gi, localName);
                                            var hash = loaderUtils.interpolateName(context, localIdentName, options);
                                            return hash.replace(new RegExp("[^a-zA-Z0-9\\-_\u00A0-\uFFFF]", "g"), "-").replace(/^((-?[0-9])|--)/, "_$1");
                                    }
                                }
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ],
                    publicPath: "../"
                }) : ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: true,
                                localIdentName: '[path]__[name]__[local]__[hash:base64:5]',
                                getLocalIdent: (context, localIdentName, localName, options) => {
                                    // console.log("getLocalIdent : " + context + " " + localIdentName +
                                    //     " " + localName + " " + options);
                                    // console.log("getLocalIdent : " + context.resourcePath + " " + context.resource +
                                    //     " " + options.context);
                                    switch (localName.substr(0, 4)) {
                                        case "ant-":
                                            // console.log("ant-: " + localName);
                                            return localName;
                                        default:
                                            if (!options.context)
                                                options.context = context.options && typeof context.options.context === "string" ? context.options.context : context.context;
                                            var request = path.relative(options.context, context.resourcePath);
                                            options.content = options.hashPrefix + request + "+" + localName;
                                            localIdentName = localIdentName.replace(/\[local\]/gi, localName);
                                            var hash = loaderUtils.interpolateName(context, localIdentName, options);
                                            return hash.replace(new RegExp("[^a-zA-Z0-9\\-_\u00A0-\uFFFF]", "g"), "-").replace(/^((-?[0-9])|--)/, "_$1");
                                    }
                                }
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ],
                    publicPath: "../"
                })
            },
            {
                // JSON LOADER
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    // },
    plugins: isProd ? (isDevServer ? basePlugins.concat(prodPlugins).concat(prodPluginsForWebpackDevServer) : basePlugins.concat(prodPlugins)) : (isDevServer ? basePlugins.concat(devPlugins).concat(devPluginsForWebpackDevServer) : basePlugins.concat(devPlugins)),
    devServer: {
        publicPath: "/www/",
        compress: true,
        port: 8384,
        historyApiFallback: {
            index: "/www/index.html"
        },
        hot: isProd ? false : true,
        stats: {
            colors: true
        },
        quiet: process.env.WEBPACK_DEV_SERVER_QUITE ? true : false
    }
    // isProd: isProd,
    // isTest: isTest
};

module.exports = webpackConfig;