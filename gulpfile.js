const gulp = require('gulp');
const babel = require('gulp-babel');
const minify = require('gulp-minify');
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
        autoprefixer({browsers: ['last 1 version']}),
        cssnano()
    ];
    return gulp.src('./public/src/stylesheets/*.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./public/dist/stylesheets'));
});

gulp.task('default', ['js', 'css']);