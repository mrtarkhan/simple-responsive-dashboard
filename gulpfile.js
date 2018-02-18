var gulp = require('gulp'),
    less = require('gulp-less'),
    minify = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    imagemin = require('gulp-imagemin'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');
var reload = browserSync.reload;



var browserifyOptions = {
    entries: ['./scripts/main.js'],
    debug: false
};

function handle_error(e) {
    console.log(e.message);
    this.emit('end');
}


//scripts
gulp.task('translate-script', function () {
    return browserify(browserifyOptions)
        .transform(babelify, {
            presets: ["env"]
        })
        .bundle()
        .on('error', handle_error)
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./build/scripts'))
        .pipe(rename({
            suffix: 'min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts'))
});


//style
gulp.task('compile-less', function () {
    gulp.src('./styles/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./build/styles/'))
        .pipe(minify({
            compatibility: 'ie8',
            keepBreaks: false,
            debug: false
        }))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('./build/styles/'));
});

//resources 
gulp.task('fonts', function () {
    return gulp.src('./node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('./build/fonts/'))
});

gulp.task('other-fonts', function () {
    return gulp.src('./fonts/*')
        .pipe(gulp.dest('./build/fonts/'))
});

gulp.task('images', () =>
    gulp.src('./images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images/'))
);

gulp.task('pages', () =>
    gulp.src('./pages/*')
    .pipe(gulp.dest('./build/'))
);


//server

gulp.task('watch', function () {
    gulp.watch('./scripts/**/*.js', ['translate-script']);
    gulp.watch('./styles/**/*.less', ['compile-less']);
    gulp.watch('./pages/**/*.html', ['pages']);
});


gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./build",
            index: "./index.html"
        }
    });
    gulp.watch("./styles/*.less").on("change", reload);
    gulp.watch("./scripts/*.js").on("change", reload);
    gulp.watch("./pages/*.html").on("change", reload);
});




gulp.task('default', ['translate-script', 'compile-less', 'fonts', 'other-fonts', 'images', 'pages', 'server', 'watch']);