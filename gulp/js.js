
const  gulp   = require('gulp'),  
	   concat = require('gulp-concat'),
	   notify = require("gulp-notify");


gulp.task('js', function () {
  return gulp.src([ 'src/js/index.module.js', 'src/js/**/!(index.module)*.js' ])
  	.pipe( concat('app.js') )
    .pipe( gulp.dest('dist/js/') )
    .pipe( notify({message: "Done JS!"}) );
});
