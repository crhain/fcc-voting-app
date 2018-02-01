const gulp = require('gulp');
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
 

gulp.task('js', () => {
    return gulp.src('./public/src/javascripts/*.js')
        .pipe(babel())
        .pipe(minify())
        .pipe(gulp.dest('./public/dist/javascripts'));
});

gulp.task('css', () => {
    var plugins = [
        autoprefixer({browsers: ['last 10 versions'], cascade: false}),
        cssnano()
    ];
    return gulp.src('./public/src/stylesheets/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./public/dist/stylesheets'));
});

gulp.task('default', ['js', 'css']);
