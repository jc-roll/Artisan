myApp.controller('AuthCtrl', ['$scope', '$rootScope', '$timeout', '$window', '$location', '$firebaseObject', '$firebaseArray', '$firebaseAuth', 'signinWithFacebook', 
  function($scope, $rootScope, $timeout, $window, $location, $firebaseObject, $firebaseArray, $firebaseAuth, signinWithFacebook) {
    
// Auths user data in changes
  $scope.authObj = $firebaseAuth();
  $scope.authObj.$onAuthStateChanged(function(firebaseUser, result) {
    if (firebaseUser) {
      console.log("Signed in as:", firebaseUser.uid);
      console.log(firebaseUser);
        var ref = firebase.database().ref();
        var userData = ref.child('users/' + firebaseUser.uid);
        var getData = $firebaseObject(userData);
        $rootScope.currentUser = getData;
    } else {
      console.log(" Signed out ");
      $rootScope.currentUser = '';
    }
  });

// signinWithFacebook triggers the factory in facebookservice
  $scope.signinWithFacebook = function(){
    signinWithFacebook.login();
  };
 
  $scope.login = function() {
    $scope.authObj.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(firebaseUser) {
      console.log("Signed in as:", firebaseUser.uid);
// window.location redirects the user back to the home page after function runs
      window.location = "#/home.html";
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  };

  $scope.submit = function() {
    $scope.authObj.$createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
    .then(function(firebaseUser) {
   
        console.log("User " + firebaseUser.uid + " created successfully!");
        var ref = firebase.database().ref();
// userData holds the loaction that I would like to refrence in the creation of a user
        var userData = ref.child('users/' + firebaseUser.uid);

//newUser set to an object at loaction userdata
//Then define scoped model data to pass to the object to be stores in the db
        var newUser = $firebaseObject(userData);
        newUser.email = $scope.user.email;
        newUser.username = $scope.user.username;
        newUser.phone = $scope.user.phone;
        newUser.password = $scope.user.password;
        newUser.$save()
        .then(function(data) {
          console.log("UserData Added to users in firebase", newUser);
//Then we set the newUser to = currentUser for auth 
          console.log($rootScope.currentUser);
          window.location = "#/home.html";
        }).catch(function(error) {
          console.error("UserData Failed to add");
        });
    }).catch(function(error) {
        console.error("Error: ", error);
    }); 
  }

  $scope.signOut = function(){
    firebase.auth().$onAuthStateChanged(function(currentUser) {
      if (currentUser) {
//Grabs the currentUser checks authentication andlogs them out callsback to the auth checker function and resets 
        firebase.auth().signOut().$onAuthStateChanged(callback);
        console.log("Signed in as:", firebaseUser.uid);
        window.location = "#/home.html";
      } else {
        console.log("Well that should have worked");
      }
    });
  }



}]);








