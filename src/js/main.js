
;(function() {		// main.js
  'use strict';

  angular
	.module( 'myApp' )
		.controller( 'myCtrl',  [
			'$http',
			'$timeout',
			'MY_KEY',
			'Users',
			 myCtrl
		])
		.controller( "sendTFCtrl",  [
			'$timeout',
			'messagesArchive',
			sendTFCtrl
		]);


	function myCtrl ($http, $timeout, MY_KEY, Users) {
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

		self.allUsers = () => {
			let resp   = Users.query(),
				to, ms = 4000;

			console.time("time since query was created");
			console.log(`resp [=Users.query()] just created: ${ JSON.stringify(resp) }.`);

			resp.$promise
				.then( data => {	// resp === data
					console.timeEnd("time since query was created");
					self.allUsersData = data;
					console.log(`Users.query (=resp. resp === data) resolved with following data:  ${ JSON.stringify(data) }.`);
				})
				// .then( data => console.log('resolve! data:', data) )
				.then( () => $timeout.cancel(to) )
				.catch( err => console.log('catch: We got the error: ', err) );

			to = $timeout( () => {
				console.log( `${ Math.floor(ms/1000) }sek has gone...     resp.$resolved: ${ resp.$resolved }.`);
				if ( !resp.$resolved ) {
					resp.$cancelRequest();
					console.log('Request canceled by time!   "self.allUsersData" set to ', self.allUsersData = null);	
				}		
			}, ms );
		}; // end of  self.allUsers

		self.cl = () => console.log( self.allUsersData );

		self.showTable = () => {
			let isShow = (self.allUsersData && self.allUsersData > 0) ? true : false;
			debugger;
			console.log(`isShow:  ${ isShow }.`);
			console.log(`self.allUsersData:  ${ self.allUsersData }.`);
			return isShow;
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

