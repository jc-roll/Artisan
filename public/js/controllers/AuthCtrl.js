myApp.controller('AuthCtrl', ['$scope', '$rootScope', '$timeout', '$window', '$location', '$firebaseObject', '$firebaseArray', '$firebaseAuth', 'signinWithFacebook', 
  function($scope, $rootScope, $timeout, $window, $location, $firebaseObject, $firebaseArray, $firebaseAuth, signinWithFacebook) {
    
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


  $scope.signinWithFacebook = function(){
    signinWithFacebook.login();
  };

 
  $scope.login = function() {
    $scope.authObj.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(firebaseUser) {
      console.log("Signed in as:", firebaseUser.uid);
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
        var userData = ref.child('users/' + firebaseUser.uid);

        var newUser = $firebaseObject(userData);
        newUser.email = $scope.user.email;
        newUser.username = $scope.user.username;
        newUser.phone = $scope.user.phone;
        newUser.password = $scope.user.password;
        newUser.$save()
        .then(function(data) {
          console.log("UserData Added to users in firebase", newUser);
          $rootScope.currentUser = newUser;
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
        firebase.auth().signOut().$onAuthStateChanged(callback);
        console.log("Signed in as:", firebaseUser.uid);
        window.location = "#/home.html";
      } else {
        console.log("Well that should have worked");
      }
    });
  }



}]);








