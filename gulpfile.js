"use strict"

let gulp = require('gulp'),
    uglify = require('gulp-uglify'),
      sass = require('gulp-sass'),
 cssMinify = require('gulp-clean-css'),
    rename = require('gulp-rename'),
      maps = require('gulp-sourcemaps'),
       del = require('del'),
    concat = require('gulp-concat'),
     image = require('gulp-image'),
     serve = require('gulp-serve'),
  browSync = require('browser-sync').create(),
  reload = browSync.reload();

  sass.compiler = require('node-sass');

  gulp.task('scripts', ()=> {
    return gulp.src(['js/circle/autogrow.js', 'js/circle/circle.js'])
    .pipe(maps.init())
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/scripts'))
  });


gulp.task('styles', ()=>{
  return gulp.src('sass/global.scss')
  .pipe(maps.init())
  .pipe(sass({file: 'all.min.css'}))
  .pipe(cssMinify())
  .pipe(rename('all.min.css'))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('dist/styles'))
  .pipe(browSync.reload({
      stream: true
    }))
});


gulp.task('images', ()=>{
    return gulp.src('images/*')
    .pipe(image())
    .pipe(gulp.dest('./dist/content'));
});


gulp.task('clean', ()=>{
  return del('dist');
});

gulp.task('build', gulp.series(['clean', 'scripts', 'styles', 'images']));

gulp.task('serveit', serve('./'));

gulp.task('watch', ()=>{
  gulp.watch('./sass/*.scss', gulp.series(['build']));
})

gulp.task('browsersync', function() {
    browSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('afterbuild', gulp.parallel(['watch', 'browsersync']));

gulp.task('default', gulp.series(['build', 'afterbuild']));
