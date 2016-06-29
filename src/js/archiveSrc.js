
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
