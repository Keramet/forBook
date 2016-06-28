
const gulp   = require('gulp'),
      wrench = require('wrench');


wrench.readdirSyncRecursive('./gulp')
    .filter( (file) => (/\.js$/i).test(file) )
    .map(    (file) => require('./gulp/' + file) );


gulp.task('watch', function () {
	gulp.watch( 'src/css/**/*.css', ['css']  );
    gulp.watch( 'src/js/**/*.js',   ['js']   );
    gulp.watch( 'src/index.html',   ['html'] );
    
});


gulp.task('default', ['css', 'html', 'js', 'watch' ], function () {
    console.log("End of 'default' task...");
});


// liveReload = require('gulp-live-reload');
// var server = liveReload();
// gulp.watch(['src/**']).on('change', function(file) {
//     server.changed(file.path);
// })



