'use strict';

var gulp = require('gulp');
var wiredep = require('wiredep').stream;

// Load plugins
var $ = require('gulp-load-plugins')();

// Scripts
gulp.task('scripts', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.jshint('.jshintrc'))
        .pipe($.jshint.reporter('default'))
        .pipe($.size());
});

// HTML
gulp.task('html', function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('app/*.html')
        .pipe($.useref.assets())
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.uncss({
            html: ['app/index.html']
        }))
        .pipe($.minifyCss())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

// Images
gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});

// Clean
gulp.task('clean', function () {
    return gulp.src(['dist','tmp'], {read: false}).pipe($.clean());
});

// Build
gulp.task('build', ['html', 'scripts', 'images']);

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

// Connect
gulp.task('connect', $.connect.server({
    root: ['app'],
    port: 9000,
    livereload: true
}));

// Inject Bower components
gulp.task('wiredep', function () {
    gulp.src('app/styles/*.scss')
        .pipe(wiredep({
            directory: 'app/bower_components',
            ignorePath: 'app/bower_components/'
        }))
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components',
            ignorePath: 'app/'
        }))
        .pipe(gulp.dest('app'));
});

// Watch
gulp.task('watch', ['connect'], function () {
    // Watch for changes in `app` folder
    gulp.watch([
        'app/*.html',
        'app/scripts/**/*.js',
        'app/images/**/*'
    ], function(event) {
        return gulp.src(event.path)
            .pipe($.connect.reload());
    });

    // Watch .js files
    gulp.watch('app/scripts/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('app/images/**/*', ['images']);

    // Watch bower files
    gulp.watch('app/bower_components/*', ['wiredep']);
});
