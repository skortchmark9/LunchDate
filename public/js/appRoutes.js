angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/preview', {
			templateUrl: 'views/preview.html',
			controller: 'PreviewController',
		})

		.when('/pairs', {
			templateUrl: 'views/pairs.html',
			controller: 'PairsController',
    })

	$locationProvider.html5Mode(true);

}]);
