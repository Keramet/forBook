
const  gulp = require('gulp'),  
	   bs   = require('browser-sync').create();


gulp.task('bs', function () {
	bs.init({
        server: {
            baseDir: "./"
        },
        startPath: '/dist/'
    });
});
