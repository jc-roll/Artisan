var myApp = angular.module('myApp',
  ['ngRoute', 'firebase'])
// This is my personal link to my firebaseIo 
  .constant('FIREBASE_URL', "https://finalproject-33408.firebaseio.com/"); 



myApp.run(['$rootScope', '$location',
  function($rootScope, $location) {
    $rootScope.$on('$routeChangeError',
      function(event, next, previous, error) {
        if (error=='AUTH_REQUIRED') {
          $rootScope.message = 'Sorry, you must log in to access that page';
          $location.path('/home');
        } // AUTH REQUIRED
      }); //event info
  }]); //run



myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    }).
    when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegistrationController'
    }).
    when('/home', {
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    }).
    otherwise({
      redirectTo: '/home'
    });
}]);