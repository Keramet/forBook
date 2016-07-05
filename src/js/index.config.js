
;(function() {
  'use strict';

  angular
    .module( 'myApp' )
        .config( config );


  /** @ngInject */
  function config ($logProvider, $locationProvider) {
    $logProvider.debugEnabled(true);
    $locationProvider.html5Mode(true);
  }

})();
