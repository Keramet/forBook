
const  gulp   = require('gulp'),  
	   notify = require('gulp-notify'),
    googlecdn = require('gulp-google-cdn');


gulp.task('html', function () {
	console.log("Start doing HTML...");

  	return gulp.src('src/index.html')
  		.pipe( googlecdn(require('../bower.json')) ) //	разобраться!
    	.pipe( gulp.dest('dist/') )
    	.pipe( notify("Done HTML!") );
});
