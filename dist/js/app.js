
;(function() {
  'use strict';

  angular
    .module( "myApp", [] );	

})();


(function() {
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


(function() {
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
		.controller( "sendTFCtrl",  ['$timeout', sendTFCtrl] );


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


	function sendTFCtrl ($timeout) {
		const  self = this,
			MAX_LEN = 100;

		self.clear    = () => self.msg = "";
		self.left     = () => MAX_LEN - self.msg.length;
		self.lessThan = (n=10) => self.left() < n ? true : false;
		self.send     = () => {
			console.log("Отправка сообщения...");
			$timeout( () => {
				console.log(`Сообщение [${self.msg}] отправлено!`);
				self.clear();
			}, 2000 );
		}
		self.clear();
	}

})();

