
describe("archiveSrc test", function () {
	let msgArchive;

	beforeEach( module('myApp') );

	beforeEach( inject(function (_messagesArchive_) {
		msgArchive = _messagesArchive_;
	}));

	it("should return right count of messages in archive", function () {
		expect( msgArchive.count ).toBe( 0 );

		// debugger;

		msgArchive.archive("1");
		expect( msgArchive.count ).toBe( 1 );

		for (let i = 1; i <= 5; i++ ) {
			msgArchive.archive( i+1 );
			expect( msgArchive.count ).toBe( i+1 );
		}

		msgArchive.archive("7");
		expect( msgArchive.count ).toBe( 7 );
	});	

	it("should give access to messages in archive", function () {
		let msg = { text: "my message..." };

		msgArchive.archive( msg );
		expect( msgArchive.getArchived() ).toContain( msg );
	});
});


