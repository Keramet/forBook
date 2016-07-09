"use strict";

let conf = {};

conf.paths  = {
    css : 'src/css/**/*.css',
    js  : 'src/js/**/*.js',
    html: 'src/index.html'
};

// module.exports = conf;
global.conf = conf;	// подумать, может лучше через module.exports

// console.log('require _conf.js!');
