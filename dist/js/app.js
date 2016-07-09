
;(function() {
  'use strict';

  angular
    .module( "myApp", [ 'ngResource' ] );	

})();


;(function() {		// archiveSrc.js
  'use strict';

	angular
	  .module('myApp')
		.factory( 'messagesArchive', function () {
			let archivedMessages = [];

			return {
				get count () { return archivedMessages.length; },

				archive (message) {
					archivedMessages.push(message);
				},
				
				getArchived () {
					return archivedMessages;
				}
			};
		});

})();


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


;(function() {
  'use strict';

  angular
    .module( 'myApp' )
    	// .constant( 'MY_KEY', '6oPi7bI8kQu6-WgcmK5-v1AbnKl63Ma4' )
    	// .constant( 'URL_DB', 'https://api.mongolab.com/api/1/databases/evkdb/' )
    	.constant( 'DB_CONF', {
    		key: '6oPi7bI8kQu6-WgcmK5-v1AbnKl63Ma4',
    		url: 'https://api.mongolab.com/api/1/databases/evkdb/'
    	});
})();


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


;(function() {		// main.js
  'use strict';

  angular
	.module( 'myApp' )
		.controller( 'myCtrl',  [
			'$http',
			'$timeout',
			'DB_CONF',
			'Users',
			'UsersJSON',
			 myCtrl
		])


	function myCtrl ($http, $timeout, DB_CONF, Users, UsersJSON) {
		const self = this;		
		
		self.addUserHttp = () => {
			let url  = DB_CONF.url + 'collections/users',
				user = { name: self.name,
						 prop: "test value1" },
		 		conf = { params: {apiKey : DB_CONF.key} };

			console.log('Сохранение информации о пользователе.....');
			$http.post(url, user, conf)
				.then( function (resp) {
					console.log(`..... [ ${resp.statusText} ]`);
					console.log('Ответ сервера: ', resp);
					self.name = "";
					// console.dir(params);
				})
				.catch( function (err) {
					console.error(`Данные не сохранены.....[${err.statusText}]!  Ответ сервера:`, err);
				});
		}

		self.addUserRes = () => {
			let newUser = { name: self.name, prop: "test value2" };

			Users.save(newUser).$promise
				.then( data => { 
					if (self.allUsersData) self.allUsersData.push( data );
					console.dir(data);
					self.name = "";
				});
		}

		self.jsonp = (nameValue) => {
			let url = 'http://angularjs.org/greet.php?callback=JSON_CALLBACK'; 
			$http.jsonp(url, { params: {name : nameValue} })
				.then( resp => self.greeting = resp.data.greeting )
				.catch( err => console.dir(err) );
		}

		self.async = () => {
			let prom = new Promise( function (resolve, reject) {
				let rand = Math.random();
					console.log( +rand.toFixed(2) );
				$timeout( () => {
					rand > 0.5 ? resolve("+") : reject("-");
				}, 2000 );
			});

			prom.then( (data) => console.info('First then (2sec). data: ', data) );

			$timeout( () => {
				prom.then( (data) => console.info('Second then (4sec). data: ', data) );
				prom.catch( (err) => console.warn('Catch (4sec). err: ', err) );
			}, 4000 );
		}


		self.allUsersHttp = () => {
			console.log('allUsersHttp');
			// let url  = DB_CONF.url + 'collections/users',
			// 	user = { name: self.name,
			// 			 prop: "test value1" },
		 // 		conf = { params: {apiKey : DB_CONF.key} };

			// console.log('Сохранение информации о пользователе.....');
			// $http.post(url, user, conf)
			// 	.then( function (resp) {
			// 		console.log(`..... [ ${resp.statusText} ]`);
			// 		console.log('Ответ сервера: ', resp);
			// 		self.name = "";
			// 		// console.dir(params);
			// 	})
			// 	.catch( function (err) {
			// 		console.error(`Данные не сохранены.....[${err.statusText}]!  Ответ сервера:`, err);
			// 	});
		}


		self.allUsersRes = () => {
			let to, ms = 4000;

			self.usersUrl = 'https://mlab.com/databases/evkdb/collections/users?_id=';

			console.time("time since query was created");
			self.allUsersData = Users.query();
			self.allUsersData.$promise
				.then( () => {
					console.timeEnd("time since query was created");
					$timeout.cancel(to);
				})
				.catch( err => console.log('catch: We got the error: ', err) );

			to = $timeout( () => {
				console.log( `${ Math.floor(ms/1000) }sek has gone...     self.allUsersData.$resolved: ${ self.allUsersData.$resolved }.`);
				if ( !self.allUsersData.$resolved ) {
					self.allUsersData.$cancelRequest();
					console.log('Request canceled by time!   "self.allUsersData" is: ', self.allUsersData);	
				}		
			}, ms );

		}; // end of  self.allUsers

		self.updateUser = user => {
			user.name = user.name.toUpperCase();
			user.$update();
			console.dir(user);
		}

		self.deleteUser = (user, idx) => {
			Users.delete({}, user).$promise
				.then( () => self.allUsersData.splice(idx, 1) );
		}

		self.cl = () => {
			console.log( 'typeof self.allUsersData: ', typeof self.allUsersData, self.allUsersData );
		};

		self.showTable = () => (self.allUsersData && self.allUsersData.length > 0);
		
		self.getUsersJSON = () => self.usersJSON = UsersJSON.query();

		self.usersJSONclick = user => {
			console.dir(user);

			let updateUser = UsersJSON.get({id: user.id});

			updateUser.$promise
				.then( () => {
					updateUser.name = "EUGEN";
					updateUser.$update();
				});
			$timeout( () => console.log( UsersJSON.get({id: user.id}) ), 3000 );
		}

	}// end of  myCtrl 

})();


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


;(function() {		// sendTFCtrl.js
  'use strict';

  angular
	.module( 'myApp' )
		.controller( 'sendTFCtrl',  [
			'$timeout',
			'messagesArchive',
			sendTFCtrl
		]);


	function sendTFCtrl ($timeout, messagesArchive) {
		const  self = this,
			MAX_LEN = 100;

		self.clear    = () => self.msg = "";
		self.left     = () => MAX_LEN - self.msg.length;
		self.lessThan = (n=10) => self.left() < n ? true : false;
		self.show	  = () => {
			console.log( `Messages in archive: ${messagesArchive.count}.`);
			console.log( messagesArchive.getArchived() );
		}
		self.send     = () => {
			messagesArchive.archive( self.msg );
			console.log("Отправка сообщения...");
			$timeout( () => {
				console.log(`Сообщение \"${self.msg}\" отправлено!`);
				self.clear();
			}, 2000 );
		}
		self.clear();
	}

})();
