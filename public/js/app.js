var myApp = angular.module("sampleApp", ["firebase"]);
  .constant('loginRedirectPath', '/login');
  .constant('FBURL', 'https://finalproject-33408.firebaseio.com');

myApp.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    if (error === "AUTH_REQUIRED") {
      $location.path("/home");
    }
  });
}]);

myApp.config(['$routeProvider', function($routeProvider) {

      apiKey: "AIzaSyBapIsFvALXS5Ysgdepi8iql2QNCxDwOFQ",
      authDomain: "finalproject-33408.firebaseapp.com",
      databaseURL: "https://finalproject-33408.firebaseio.com",
      storageBucket: "finalproject-33408.appspot.com",

    };

      firebase.initializeApp(config);

  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$waitForSignIn();
      }]
    }
    }).
    when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterController',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$waitForSignIn();
        }]
      }
    }).
    when('/home', {
      templateUrl: 'views/home.html',
      controller: 'HomeController',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$waitForSignIn();
      }]
    }
    }).
    when('/locations', {
      templateUrl: 'views/locations.html',
      controller: 'LocationsController',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$waitForSignIn();
      }]
    }
    }).
    when('/gallery', {
      templateUrl: 'views/gallery.html',
      controller: 'GalleryController',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireSignIn();
      }]
    }
    }).
    when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileController',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireForSignIn();
      }]
    }
    }).
    otherwise({
      redirectTo: '/home'
    });
}]);