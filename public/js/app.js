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
  }).when("/home", {
    controller: "AuthCtrl",
    templateUrl: "views/home.html",
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$waitForSignIn();
      }]
    }
  }).when("/nav", {
    controller: "AuthCtrl",
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$waitForSignIn();
      }]
    }
  }).when("/logout", {
    controller: "AuthCtrl",
    templateUrl: "views/logout.html",
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

myApp.factory("signinWithFacebook", function() {
        var facebookService = [];
        function writeUserData(userId, name, email) {
            firebase.database().ref('users/' + userId)
            .set({
                username: name,
                email: email
            });
        }

  facebookService.login = function() {
      var facebookProvider = new firebase.auth.FacebookAuthProvider();

          firebase.auth().signInWithPopup(facebookProvider);
          firebase.auth().onAuthStateChanged(function(user) {
              var user = firebase.auth().currentUser;
              if (user) {
                  //Now we can call the write function to create and set the scope into the fb
                  writeUserData(user.uid, user.displayName, user.email);
                  console.log(firebase.auth().currentUser.displayName);
              } else {
                  console.log("Login Failed");
              }
          });
    };
    return facebookService;
});