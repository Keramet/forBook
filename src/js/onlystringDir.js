
;(function() {
  'use strict';

	angular
	  .module('myApp')
		.directive( 'onlystring', function () {		//	to store in model only string values
			return {
				restrict: "A",
				require: 'ngModel',
				link: function(scope, element, attr, ngModel) {
     				ngModel.$parsers.push( val => ("" + val) );
    			}
			}
		});

})();
