
require('./_conf');

const  gulp   = require('gulp'),  
	   notify = require('gulp-notify'),
    googlecdn = require('gulp-google-cdn');
  	


gulp.task('html', function () {
	console.log("Start doing HTML...");

  	return gulp.src( conf.paths.html )
  		// .pipe( googlecdn(require('../bower.json')) ) //	разобраться!
    	.pipe( gulp.dest('dist/') )
    	.pipe( notify("Done HTML!") );
});
