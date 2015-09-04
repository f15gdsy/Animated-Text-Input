var gulp        = require('gulp');
var browserSync = require('browser-sync');
var rimraf = require('rimraf');
var util = require('gulp-util');
var shell = require('gulp-shell');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');

var browserSyncOptions = {
    files: ['example/**', 'src/**'],

    watchOptions: {
        debounceDelay: 1000
    },

    server: {
        baseDir: 'example',
        routes: {
            '/config.js': './config.js',
            '/jspm_packages': './jspm_packages/',
            '/react.js': './jspm_packages/npm/react@0.13.3/dist/react.min.js',
            '/src': './src/'
        }
    },

    startPath: '/'
};

gulp.task('server', function () {
    browserSync(browserSyncOptions);
});

gulp.task('default', ['server']);


// DISTRIBUTION
// ------------------------------

// Delete dist directory
gulp.task('delete-dist', function () {
    rimraf('./example/dist', function (err) {
        util.log(err);
    });
});

// Copy index.html to 'dist'
gulp.task('html', function () {
    gulp.src('./example/index.html')
        .pipe(gulp.dest('./example/dist'))
        .on('error', util.log);
});

// Bundle with jspm
gulp.task('bundle', shell.task([
    'jspm bundle-sfx example/app example/dist/app.js'
]));

//Uglify the bundle
gulp.task('uglify', function () {
    return gulp.src('./example/dist/app.js')
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('./example/dist'))
        .on('error', util.log);
});

gulp.task('dist', function () {
    runSequence(
        'delete-dist',
        ['html', 'bundle'],
        'uglify'
    );
});
