
;(function() {
  'use strict';

  angular
    .module( "myApp", [] );	

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
    .module('myApp')
        .config(config);


  /** @ngInject */
  function config($logProvider, $locationProvider) {
    $logProvider.debugEnabled(true);
    $locationProvider.html5Mode(true);
  }

})();


;(function() {
  'use strict';

  angular
    .module( 'myApp' )
    	.constant( 'MY_KEY', '6oPi7bI8kQu6-WgcmK5-v1AbnKl63Ma4' );

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


;(function() {
  'use strict';

  angular
	.module( "myApp" )
		.controller( "myCtrl",  ['$http', '$timeout', 'MY_KEY',  myCtrl] )
		.controller( "sendTFCtrl",  ['$timeout', 'messagesArchive', sendTFCtrl] );


	function myCtrl ($http, $timeout, MY_KEY) {
		const self = this;		
	
		self.data = [
			{ name: "Ukraine", population:  40 },
			{ name: "France",  population:  50 },
			{ name: "USA",     population:  90 },
			{ name: "Russia",  population: 140 },
		];
		self.total = 6000;
		self.name  = "Gen";

		self.sayHello = () => console.log(self.name);
		self.getPart  = population => 100 * population / self.total;
		
		self.addUser = () => {
			let url  = 'https://api.mongolab.com/api/1/databases/evkdb/collections/users',
				user = { name: self.name,
						 prop: "test value1" },
				conf = { params: {apiKey : MY_KEY} };

			console.log('Сохранение информации о пользователе.....');
			$http.post(url, user, conf)
				.then( function (resp) {
					console.log(`...[ ${resp.statusText} ]   Ответ сервера:`, resp);
					// console.dir(params);
				})
				.catch( function (err) {
					console.error(`Данные не сохранены.....[${err.statusText}]!  Ответ сервера:`, err);
				});
		}

		self.delUser = () => {
			let url  = 'https://api.mongolab.com/api/1/databases/evkdb/collections/users/'
					   + self.id,
				conf = { params: {apiKey : MY_KEY} };

			$http.delete(url, conf)
				.then( resp => {
					console.dir( resp );
					console.log( resp.headers() );
					self.id = "";	
				})
				.catch( err => console.dir(err) );		   
		}

		self.jsonp = (nameValue) => {
			let url = 'http://angularjs.org/greet.php?callback=JSON_CALLBACK'; 
			$http.jsonp(url, { params: {name : nameValue} })
				.then( resp => self.greeting = resp.data.greeting )
				.catch( err => console.dir(err) );
		}

		self.async = () => {
			let prom = new Promise( function (resolve, reject) {
				let rand = 0.5553;// Math.random();
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

		 

	}// end of  myCtrl 


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
