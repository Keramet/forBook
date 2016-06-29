
;(function() {		//	index.run.js
  'use strict';

  angular
    .module('myApp')
    	.run(runBlock);


  /** @ngInject */
  function runBlock ($log) {
    $log.debug('runBlock end');
  }

})();
