
;(function () {		//	resource.js
  'use strict';

  angular
    .module( 'myApp' )
    	.factory( 'Users', [ '$resource', 'MY_KEY', 'URL_DB',  Users ] );


    	function Users ($resource, MY_KEY, URL_DB) {
    		let url = URL_DB + 'collections/users/:id',
    			  q = {method: 'get', isArray: true, cancellable: true};
    		// let url = 'https://api.mongolab.com/api/1/databases/evkdb/collections/users';
   
    		return $resource( url, { id     : '@_id.$oid', 
    						         apiKey : MY_KEY     }, { query: q } );
    	}

})();
