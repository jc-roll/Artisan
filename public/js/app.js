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
  $routeProvider.
    when("/login", {
      controller: "AuthCtrl",
      templateUrl: "views/login.html",
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
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
    }).when("/locations", {
      controller: "HomeCtrl",
      templateUrl: "views/locations.html",
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$waitForSignIn();
        }]
      }
    }).when("/faqs", {
      controller: "HomeCtrl",
      templateUrl: "views/faqs.html",
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$waitForSignIn();
        }]
      }
    }).when("/information", {
      controller: "HomeCtrl",
      templateUrl: "views/information.html",
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$waitForSignIn();
        }]
      }
    }).when("/home", {
      controller: "AuthCtrl",
      templateUrl: "views/home.html",
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$waitForSignIn();
        }]
      }
    }).when("/userNav", {
      controller: "AuthCtrl",
      templateUrl: "views/userNav.html",
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$waitForSignIn();
        }]
      }
    }).when("/siteNav", {
      controller: "AuthCtrl",
      templateUrl: "views/siteNav.html",
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$waitForSignIn();
        }]
      }
    }).otherwise({ 
          redirectTo: '/home' 
    }); 
}]);

myApp.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();

}]);