
describe("myCtrl $http-test: ", function () {
	let $http, $httpBackend, ctrl,

	beforeEach( module('myApp') );

	beforeEach( inject( function (_$http_, _$httpBackend_) {
		$http = _$http_;
		$httpBackend = _$httpBackend_;
	}) );

	beforeEach( inject( function ($controller) {
		ctrl = $controller( 'myCtrl' );
	}) );


	it('should return all users', function () {
		// настройка ожидаемого запроса и ответа
		$httpBackend
			.whenGET('http://localhost:3000/databases/ascrum/collections/users')
			.respond([{name: 'Pawel'}, {name: 'Peter'}]);

		// вызвать тестируемый код
		$scope.queryUsers();
		// имитировать ответ
		$httpBackend.flush();
		// проверить результат
		expect($scope.users.length).toEqual(2);
	});

	afterEach( function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

});

