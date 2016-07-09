
;(function () {		//	resource.js
  'use strict';

  angular
    .module( 'myApp' )
    	.factory( 'Users',     ['$resource', 'DB_CONF', Users] )
    	.factory( 'UsersJSON', ['$resource', UsersJSON] );


    	function Users ($resource, DB_CONF) {
    		let url = DB_CONF.url + 'collections/users/:id';
   
    		return $resource( 
    			url, 
    			{ id     : '@_id.$oid', 
    			  apiKey : DB_CONF.key },
    			{ query  : {method: 'GET', isArray: true, cancellable: true},
    			  update : {method: 'PUT'} }
    		);
    	}

    	function UsersJSON ($resource) { 
    		let url = 'http://jsonplaceholder.typicode.com/users/:id';
   
    		return $resource(url, { id: '@id' }, {update: {method:'PUT'}});
    	}

})();
