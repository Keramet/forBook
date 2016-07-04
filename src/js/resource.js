
;(function () {		//	resource.js
  'use strict';

  angular
    .module('myApp')
    	.factory('Users', [ '$resource', 'MY_KEY',  function ($resource, MY_KEY) {
    		let url = 'https://api.mongolab.com/api/1/databases/evkdb/collections/users/:id';
    		
    		return $resource( url, { apiKey : MY_KEY,
    								     id : '@_id.$oid' } );
    	} ]);

})();
