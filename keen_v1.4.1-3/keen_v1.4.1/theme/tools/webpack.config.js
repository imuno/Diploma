/**
 * Main file of webpack config.
 * Please do not modified unless you know what to do
 */

const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const fs = require("fs");
const parser = require("comment-parser");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackRTLPlugin = require("webpack-rtl-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const WebpackMessages = require("webpack-messages");
const ExcludeAssetsPlugin = require("webpack-exclude-assets-plugin");
const atob = require("atob");
const slash = require("slash");

// optional
const ReplaceInFileWebpackPlugin = require("replace-in-file-webpack-plugin");

/**
 * Known issues:
 * 1) Remove webpack bootstrap for single-module apps
 *      https://github.com/webpack/webpack/issues/2638
 */

// arguments/params from the line command
const args = {};
// remove first 2 unused elements from array
const argv = JSON.parse(process.env.npm_config_argv).cooked.slice(2);
argv.forEach((arg, i) => {
    if (arg.match(/^--/)) {
        const next = argv[i + 1];
        args[arg] = true;
        if (next && !next.match(/^--/)) {
            args[arg] = argv[i + 1];
        }
    }
});
// read parameters from the command executed by user
const demo = args["--demo"];
const rtl = args["--rtl"] || false;
const prod = args["--prod"] || false;
const css = args["--css"] || true;
const js = args["--js"] || true;

// theme name
const name = getRoot("keen");

// global variables
const release = true;
const apiUrl = false; // boolean
const rootPath = path.resolve(__dirname, "..");
const frameworkPath = path.resolve(__dirname, "..");
const distPath = rootPath + "/dist";
const configPath = rootPath + "/tools";
const assetDistPath = distPath + "/assets";
const srcPath = rootPath + "/src/assets";

// page scripts and styles
const pageScripts = glob.sync(srcPath + "/js/theme/pages/**/!(_*).js");
const pagesScss = glob.sync(srcPath + "/sass/theme/pages/**/!(_*).scss");

// get list of available demos
let demos = require(configPath + "/webpack/demos");
if (demo) {
    // filter by demos, remove unused demos from the list on the run
    demos = demos.filter((d) => {
        return demo.split(",").indexOf(d) !== -1;
    });
}

const extraPlugins = [];
const filesConfig = [];
const imageReference = {};
const exclude = [];
const nodeMedia = [];

// get all assets config
let files = glob.sync(configPath + "/webpack/**/*.js");
// exclude unused files from excluded demos
files = files.filter((filename) => {
    if (filename.match(/demo[0-9]*/)) {
        if (!filename.match(new RegExp("\/(" + demos.join("|") + ")\/", "g"))) {
            return false;
        }
    }
    return true;
});

// parse comments to get the output location
files.forEach((filename) => {
    // get file content
    const text = fs.readFileSync(filename).toString();
    // use parser plugin to parse the comment.
    const parsed = parser(text);
    if (parsed.length > 0 && parsed[0].tags.length > 0) {
        // push to list
        filesConfig.push({
            filename: filename,
            params: parsed[0].tags,
        });
    }
});

const entries = {};
filesConfig.forEach((file) => {
    let output = "";
    file.params.forEach((param) => {
        // get output path
        if (param.tag === "output") {
            output = param.name;
        }
    });
    entries[output] = file.filename;
});

demos.forEach((demo) => {
    // process skin scss
    const skinScss = glob.sync(srcPath + "/sass/theme/demos/" + demo + "/**/!(_*|style*).scss");
    skinScss.forEach((file) => {
        const matched = file.match(/demos\/demo[1-9]+\/(.*?)\.scss$/);
        if (matched) {
            entries["css/" + demo + "/skins/" + matched[1].replace(/\/skins\//, "/")] = file;
        }
    });

    // process pages scss
    pagesScss.forEach((file) => {
        const matched = file.match(/theme\/(pages\/.*?)\.scss$/);
        if (matched) {
            // keep image reference for output path rewrite
            const imgMatched = fs.readFileSync(file).toString().match(/['|"](.*?\.(gif|png|jpe?g))['|"]/g);
            if (imgMatched) {
                imgMatched.forEach((img) => {
                    img = img.replace(/^['|"](.+(?=['|"]$))['|"]$/, '$1');
                    imageReference[path.basename(img)] = "css/" + demo + "/" + matched[1] + ".css";
                });
            }
            entries["css/" + demo + "/" + matched[1]] = file;
        }
    });

    // auto get page scripts from source
    pageScripts.forEach(function (jsPath) {
        const matched = jsPath.match(/js\/theme\/(.*?)\.js$/);
        entries["js/" + demo + "/" + matched[1]] = jsPath;
    });

    if (release) {
        // copy html by demo
        extraPlugins.push(new CopyWebpackPlugin([{
            from: rootPath + "/src/" + demo,
            to: distPath + "/" + demo,
        }]));
    }
});

if ((/true/i).test(rtl)) {
    // enable rtl for css
    extraPlugins.push(new WebpackRTLPlugin({
        filename: "[name].rtl.css",
    }));
}

if (!(/true/i).test(js)) {
    // exclude js files
    exclude.push('\.js$');
}

if (!(/true/i).test(css)) {
    // exclude css files
    exclude.push('\.s?css$');
}

if (exclude.length) {
    // add plugin for exclude assets (js/css)
    extraPlugins.push(new ExcludeAssetsPlugin({
        path: exclude
    }));
}

if (apiUrl) {
    // replace api url to point to server
    extraPlugins.push(new ReplaceInFileWebpackPlugin([{
        dir: assetDistPath + "/js",
        test: /\.js$/,
        rules: [{
            search: /inc\/api\//i,
            replace: 'https://keenthemes.com/' + name + '/themes/themes/' + name + '/dist/preview/inc/api/'
        }]
    }]));
}

module.exports = function () {
    return {
        // enabled/disable optimizations
        mode: (/true/i).test(prod) ? "production" : "development",
        // console logs output, https://webpack.js.org/configuration/stats/
        stats: "errors-warnings",
        performance: {
            // disable warnings hint
            hints: false
        },
        optimization: {
            // js and css minimizer
            minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        },
        entry: entries,
        output: {
            // main output path in assets folder
            path: assetDistPath,
            // output path based on the entries' filename
            filename: "[name].js"
        },
        resolve: {
            alias: {
                "morris.js": "morris.js/morris.js",
                "jquery-ui": "jquery-ui",
            }
        },
        plugins: [
            // create css file
            new MiniCssExtractPlugin({
                filename: "[name].css",
            }),
            // copy media
            new CopyWebpackPlugin([{
                from: srcPath + "/media",
                to: assetDistPath + "/media",
            }]),
            // webpack log message
            new WebpackMessages({
                name: name,
                logger: str => console.log(`>> ${str}`)
            }),
            {
                apply: (compiler) => {
                    // hook name
                    compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
                        filesConfig.forEach((file) => {
                            let output = "";
                            file.params.forEach((param) => {
                                // get output path
                                if (param.tag === "output") {
                                    output = param.name;
                                }
                                if (param.tag === "images") {
                                    param.name.split(",").forEach((file) => {
                                        if (file) {
                                            const outputPath = assetDistPath + "/" + pathWithoutFile(output) + "/images/";
                                            // create dir
                                            fs.mkdirSync(outputPath, {recursive: true});
                                            // copy image
                                            fs.copyFileSync(fs.realpathSync(srcPath + "/" + file), outputPath + path.basename(file));
                                        }
                                    });
                                }
                            });
                        });
                    });
                }
            },
        ].concat(extraPlugins),
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                    ],
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                                // use for separate css pages (custom pages, eg. wizard, invoices, etc.)
                                includePaths: demos.map((demo) => {
                                    return srcPath + "/sass/theme/demos/" + demo;
                                })
                            }
                        },
                    ]
                },
                {
                    test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                    include: [
                        path.resolve(__dirname, "node_modules"),
                        rootPath,
                        frameworkPath,
                    ],
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                // prevent name become hash
                                name: "[name].[ext]",
                                // move files
                                outputPath: "vendors/global/fonts",
                                // rewrite path in css
                                publicPath: "fonts",
                            }
                        }
                    ]
                },
                {
                    test: /\.(gif|png|jpe?g)$/,
                    include: [
                        path.resolve(__dirname, "node_modules"),
                        rootPath,
                    ],
                    use: [{
                        loader: "file-loader",
                        options: {
                            // prevent name become hash
                            name: "[name].[ext]",
                            // move files
                            outputPath: (url, resourcePath) => {
                                // look for node_modules plugin
                                const matched = slash(resourcePath).match(/node_modules\/(.*?)\//);
                                if (matched) {
                                    for (let i = 0; i < filesConfig.length; i++) {
                                        if (filesConfig[i].filename.match(new RegExp(matched[1]))) {
                                            let output = "";
                                            filesConfig[i].params.forEach((param) => {
                                                // get output path without filename
                                                if (param.tag === "output") {
                                                    output = pathWithoutFile(param.name);
                                                }
                                            });
                                            nodeMedia[url] = output + "/images/" + url;
                                            return output + "/images/" + url;
                                        }
                                    }
                                }
                                // the rest of images put in media/misc/
                                return "media/misc/" + url;
                            },
                            // rewrite path in css
                            publicPath: (url, resourcePath) => {
                                if (imageReference[url]) {
                                    // fix image rewrite path
                                    const filePath = pathWithoutFile(imageReference[url]);
                                    return slash(path.relative(assetDistPath + "/" + filePath, assetDistPath + "/media") + "/" + url);
                                }
                                if (nodeMedia[url]) {
                                    return "images/" + url;
                                }
                                return "../../media/misc/" + url;
                            },
                        }
                    }]
                },
            ]
        },
        // webpack dev server config
        devServer: {
            contentBase: distPath,
            compress: true,
            port: 3000
        }
    };
};

function getRoot(name) {
    if (typeof name !== 'undefined') {
        return name;
    }
    const ts = ["bWV0cm9uaWM=", "a2Vlbg=="];
    let tf = atob(ts[0]);
    ts.forEach(function (t) {
        const th = atob(t);
        if (args["--" + th]) {
            tf = th;
        }
    });
    return tf;
}

function pathWithoutFile(filname) {
    return filname.substring(0, filname.lastIndexOf("/"));
}
