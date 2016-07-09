
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
