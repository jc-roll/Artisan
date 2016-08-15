var myApp = angular.module('myApp', ['ngRoute', 'firebase']);

myApp.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    console.log(error);
    if (error === "AUTH_REQUIRED") {
      $location.path("/home");
    }
  });
}]);

myApp.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/landing.html',
    controller: 'AuthCtrl'
  })
  $routeProvider.when("/login", {
    // the rest is the same for ui-router and ngRoute...
    controller: "AuthCtrl",
    templateUrl: "views/login.html",
    resolve: {
      // controller will not be loaded until $waitForSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $waitForSignIn returns a promise so the resolve waits for it to complete
        return Auth.$waitForSignIn();
      }]
    }
  }).when("/register", {
    controller: "AuthCtrl",
    templateUrl: "views/register.html",
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$waitForSignIn();
      }]
    }
  }).when("/home", {

    controller: "HomeCtrl",
    templateUrl: "views/home.html",
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$waitForSignIn();
      }]
    }
  }).when("/nav", {
    controller: "AuthCtrl",
    templateUrl: "views/nav.html",
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$waitForSignIn();
      }]
    }
  }).otherwise({ 
        redirectTo: '/home' 
      }); ;
}]);

myApp.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);