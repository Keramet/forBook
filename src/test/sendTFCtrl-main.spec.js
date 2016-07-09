

describe("SendTFCtrl test: ", function () {
	let ctrl,
		messagesArchive;

	beforeEach( module('myApp') );

	beforeEach( inject( function ($controller) {
		ctrl = $controller( 'sendTFCtrl' );
	}) );

	
	describe("Field 'msg' - ", function () {

		it("should return empty string", function () {
			expect( ctrl.msg ).toBe( "" );
		});

		it("should return right messages", function () {
			ctrl.msg = "123";
			expect( ctrl.msg ).toEqual( "123" );

			ctrl.msg = "111111111";
			expect( ctrl.msg ).toBe( "111111111" );

			expect( ctrl.msg="vjjw" ).toBe( "vjjw" );
		});

		it("'.clear()' should clear message", function () {
			ctrl.msg = "some msg";
			expect( ctrl.msg ).toBe( "some msg" );

			ctrl.clear();
			expect( ctrl.msg ).toBe( "" );
		});
	});


	describe("Method 'send()'", function () {

		beforeEach( inject(function (_messagesArchive_) {
			messagesArchive = _messagesArchive_;
		}) );


		it("should put messages to archive", function () {
			ctrl.msg = "123";
			ctrl.send();
			expect( messagesArchive.count ).toBe( 1 );
			expect( messagesArchive.getArchived() ).toContain( "123" );

			ctrl.msg = "some msg";
			ctrl.send();
			expect( messagesArchive.count ).toBe( 2 );
			expect( messagesArchive.getArchived() ).toEqual(["123", "some msg"]);			
		});

	});


});