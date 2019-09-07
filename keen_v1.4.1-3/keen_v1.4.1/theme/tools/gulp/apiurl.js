var gulp = require('gulp');
var build = require('./build');
const path = require("path");
const glob = require("glob");
const fs = require("fs");

// Gulp task to find api path and convert to absolute url
gulp.task('apiurl', function (cb) {
    var output = "../../releases/" + build.name + "_v" + build.version + "/theme";
    var files = glob.sync(path.resolve(__dirname, output + '/**/*.js'));
    files.forEach(filename => {
        fs.readFile(filename, {}, function (e, src) {
            if (src) {
                var text = src.toString();
                var test = text.match(/["|']inc\/api\/(.*?)["|']/g);
                if (test) {
                    var replaced = text.replace(/inc\/api/g, build.config.path.demo_api_url + "inc/api");
                    fs.writeFileSync(filename, replaced);
                }
            }
        });
    });
    cb();
});