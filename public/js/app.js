var myApp = angular.module('myApp', ['ngRoute', 'firebase']);

// for ngRoute
myApp.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireSignIn promise is rejected
    // and redirect the user back to the home page
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
    controller: "LoginCtrl",
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
    // the rest is the same for ui-router and ngRoute...
    controller: "AuthCtrl",
    templateUrl: "views/register.html",
    resolve: {
      // controller will not be loaded until $waitForSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $waitForSignIn returns a promise so the resolve waits for it to complete
        return Auth.$waitForSignIn();
      }]
    }
  }).when("/home", {
    // the rest is the same for ui-router and ngRoute...
    controller: "HomeCtrl",
    templateUrl: "views/home.html",
    resolve: {
      // controller will not be loaded until $waitForSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $waitForSignIn returns a promise so the resolve waits for it to complete
        return Auth.$waitForSignIn();
      }]
    }
  }).when("/account", {
    // the rest is the same for ui-router and ngRoute...
    controller: "AccountCtrl",
    templateUrl: "views/account.html",
    resolve: {
      // controller will not be loaded until $requireSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $requireSignIn returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return Auth.$requireSignIn();
      }]
    }
  }).otherwise({ 
        redirectTo: '/home' 
      }); ;
}]);


myApp.controller('AuthCtrl', ['$scope', '$timeout', '$window', '$location', '$firebaseObject', '$firebaseArray', '$firebaseAuth', function($scope, $timeout, $window, $location, $firebaseObject, $firebaseArray, $firebaseAuth) {

    // facebook sdk for grab data from Facebook prfile
    $window.fbAsyncInit = function() {
        FB.init({
          appId: '1812013779036047',
          status: true,
          xfbml: true,
          version: 'v2.6'
        });
    };

    /*------------------------------------*\
        AUTH
    \*------------------------------------*/

    // 1. Auth with pass and email
    $scope.submit = function() {
        firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password).then(function(status) {
            var userData = firebase.database().ref('users/' + $scope.uid).set({
                    name: $scope.name,
                    email: $scope.email,
                    id: $scope.uid
        }).catch(function(error) {
          // Handle Errors here.
          $scope.$applyAsync(function() {
            $scope.errorMessage = error.message;
          });

        });
    });
      };

    // 2. Auth Facebook
    var provider = new firebase.auth.FacebookAuthProvider();
    // Permissions
    provider.addScope('email');
    provider.addScope('user_friends');

    $scope.facebook = function () {
        // firebase.auth().signInWithRedirect(provider);
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          console.log(token);
          // The signed-in user info.
          var user = result.user;
          // ...
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    };

    // Log Out
    $scope.logOut = function () {
        firebase.auth().signOut().then(function() {
            console.log('Sign-out successful.');
        }, function(error) {
            console.log('An error happened.');
        });
    };

    // If user Logged in v1
    $timeout(function () {
        $scope.user = firebase.auth().currentUser;
        if($scope.user) {
            $scope.uid = $scope.user.uid
            $scope.getUsers();
        }
    console.log($scope.users);
        }, 200);


    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $scope.uid = user.uid;
        console.log($scope.uid);
        // User is signed in.
        console.log('User is signed in.');
        $scope.getData();
        console.log(firebase.auth().currentUser);
        console.log(currentUser);
      } else {
        // No user is signed in.
        console.log('No user is signed in.');
      }
    });

    /*------------------------------------*\
        DATA
    \*------------------------------------*/


    // Get Data from collection json
    $scope.getData = function() {
      var ref = firebase.database().ref('users' + $scope.uid);
      $scope.data = $firebaseArray(ref);
    };


    // Get users form users json
    $scope.getUsers = function() {
        var ref = firebase.database().ref('users/'+ $scope.name);

        $scope.users = $firebaseArray(ref);
        console.log($scope.users);
        console.log($firebaseArray(ref));
    };



    // Add new Data to Users (Перезаписывает весь json users)
    $scope.setUser = function() {
        firebase.database().ref('users/'+ $scope.name).set({
            name: $scope.userName,
            email: $scope.userEmail,
            uid: $scope.uid
        });
    };

    // Add new Data to Users (добавляет новый json users)
    $scope.pushUser = function() {
        firebase.database().ref('users/'+$scope.uid).push({
            name: $scope.userName,
            email: $scope.userEmail,
            email: $scope.uid
        }).catch(function (error) {
            console.log(error);
        });
    };


    // UPDATE
    $scope.updateUser = function(user) {
        var postData = {
            name: 'updateName',
            email: 'updatedEmail'
          };
          // var key = firebase.database().ref().child('users').push().key
          firebase.database().ref('users/'+ $scope.uid +"/" + user.$id).update(postData);
        // firebase.database().ref('users/').update({
        //     name: $scope.userName,
        //     email: $scope.userEmail
        // });
    };

    // DELETE
    $scope.deleteUser = function(user) {
        // $scope.users.delete(user);
        firebase.database().ref('users/'+ $scope.uid +"/" + user.$id).remove();
    };


    /*------------------------------------*\
        Facebook SDK
    \*------------------------------------*/

    $scope.getFacebookInfo = function () {
        FB.api(
           "/me",
            function (response) {
                console.log(response);
              if (response && !response.error) {
                /* handle the result */
              }
            }
        );
    };
}]);

myApp.controller("LoginCtrl", ["currentAuth", "$scope", "Auth", "$route", function(currentAuth, $scope, Auth, $route) {
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not signed in
  $scope.auth = Auth;

  $scope.login = function(){
    Auth.$signInAnonymously().then(function(firebaseUser){
        $scope.user = firebaseUser;
      }).catch(function(error) {
        $scope.error = error;
      });
  };

  $scope.signOut = function(){
    Auth.$signOut()
  };

  $scope.auth.$onAuthStateChanged(function(firebaseUser){
    $scope.user = firebaseUser;
    //$route.reload();
    console.log("state change");
  });

  //console.log($scope.auth);
  //console.log($scope.currentAuth);
  //console.log(Auth.$requireSignIn());
}]);

myApp.controller("HomeCtrl", ["currentAuth", "$scope", "Auth", "$route", function(currentAuth, $scope, Auth, $route) {
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not signed in

  $scope.signOut = function(){
    console.log($scope.user);
    Auth.$signOut();
  }

  Auth.$onAuthStateChanged(function(firebaseUser) {
    $scope.user = firebaseUser;
    console.log(firebaseUser);
    //if user is logged out go back to login page
    if(firebaseUser === "" || firebaseUser === null){
      $route.reload();
    }
  });

  //$route.reload();
  console.log("HomeCtrl");
  //console.log($scope.currentAuth);
  //console.log(Auth.$requireSignIn());
}]);

myApp.controller("AccountCtrl", ["currentAuth", "$scope", "Auth", "$route", function(currentAuth, $scope, Auth, $route) {
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not signed in

  $scope.auth = Auth;
    console.log("In Account Controller: "+ currentAuth);

  $scope.signOut = function(){
    Auth.$signOut();
    $route.reload();
  };

  $scope.auth.$onAuthStateChanged(function(firebaseUser) {
    $scope.user = firebaseUser;
    //$route.reload();
    console.log("in account controller state change");
    if(firebaseUser === "" || firebaseUser === null){
      $route.reload();
    }  
  }); 

}]);

// let's create a re-usable factory that generates the $firebaseAuth instance
myApp.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);