var gulp = require('gulp');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean-css');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate');

var source = ['scripts/*.js', 'scripts/*/*.js'];

var library = [
    'library/angular.min.js',
    'library/angular-animate.min.js',
    'library/angular-local-storage.min.js',
    'library/angular-route.min.js',
	'library/chart.min.js',
    'library/html2canvas.min.js',
    'library/sweetalert.js',    
    'library/ui-bootstrap-tpls.js'
];
var style = ['styles/style.css', 'styles/modal.css', 'styles/bootstrap.css'];
var style2 = ['styles/style.css', 'styles/modal.css'];
var textcss = ['styles/circle.css', 'styles/sweetalert.css'];

gulp.task('default', function() {
    return gulp.src(source)
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('lib', function() {
    return gulp.src(library)
        .pipe(concat('lib.min.js'))
        .pipe(gulp.dest('build'))
});

gulp.task('textcss', function() {
    return gulp.src(textcss)
        .pipe(concat('text.css'))
        .pipe(clean(''))
        .pipe(rename('text.min.css'))
        .pipe(gulp.dest('build'))
});

gulp.task('stylecss', function() {
    return gulp.src(style)
        .pipe(concat('stylecss.css'))
        .pipe(clean(''))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('build'))
});

gulp.task('jshint', function() {
    gulp.src(['scripts/*.js', 'scripts/*/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('gulp-jshint-file-reporter', { filename: './jsCheck.txt' }));
});