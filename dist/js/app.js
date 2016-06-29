
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
    .module('myApp')
    	.constant('FB_URL', "https://my-anapp.firebaseio.com/");

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
		.controller( "myCtrl",  myCtrl )
		.controller( "sendTFCtrl",  ['$timeout', 'messagesArchive', sendTFCtrl] );


	function myCtrl () {
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
	} 


	function sendTFCtrl ($timeout, messagesArchive) {
		const  self = this,
			MAX_LEN = 100;

		// self.archive  = messagesArchive;
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
