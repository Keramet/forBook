
const gulp   = require('gulp'),
      wrench = require('wrench');


wrench.readdirSyncRecursive('./gulp')
    .filter( (file) => (/\.js$/i).test(file) )
    .map(    (file) => require('./gulp/' + file) );


gulp.task('watch', function () {
	gulp.watch( conf.paths.css,  ['css']  );
    gulp.watch( conf.paths.js,   ['js']   );
    gulp.watch( conf.paths.html, ['html'] );
    
});


gulp.task('default', ['css', 'html', 'js', 'watch' ], function () {
    console.log("End of 'default' task...");
});

