var gulp = require("gulp");
var script = require("gulp-build-tools").script;
var babelify = require("babelify");
var reactify = require("reactify");

var deps = ["react", "babelify/polyfill"];

gulp.task("lib", function() {
    script.bundle({
        entries: [],
        paths: [],
        watch: false,
        dest_filename: "lib.js",
        dest_folder: "./dist/js/",
        compress: false,
        include_dependencies: deps
    });
});

gulp.task('app', function() {

    script.bundle({
        paths: ["./node_modules", "./src"],
        entries: ['./src/app.js'],
        watch: false,
        dest_filename: "app.js",
        dest_folder: "./dist/js/",
        compress: false,
        reference_dependencies: deps,
        sourcemaps: true,
        transforms: [
            babelify.configure({ loose: ["es6.modules"], "optional": [ "es7.decorators", "es7.asyncFunctions" ] })
        ]
    });
});

gulp.task("both", ["app", "lib"]);
