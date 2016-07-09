
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
