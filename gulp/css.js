const   gulp    = require('gulp'),
     // plugins = require('gulp-load-plugins')();
      concatCss = require('gulp-concat-css'),
	    minifyCSS = require('gulp-minify-css'),
	    rename    = require('gulp-rename'),
	    notify    = require('gulp-notify');

 
gulp.task('css', function () {
  return gulp.src('src/css/**/*.css')
    .pipe( concatCss('style.css') )
    .pipe( gulp.dest('dist/css/') )
    .pipe( minifyCSS() )
    .pipe( rename('style.min.css') )
    .pipe( gulp.dest('dist/css/') )
    .pipe( notify("Done CSS!") );
});