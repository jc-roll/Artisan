myApp.controller('AuthCtrl', ['$scope', '$rootScope', '$timeout', '$window', '$location', '$firebaseObject', '$firebaseArray', '$firebaseAuth', function($scope, $rootScope, $timeout, $window, $location, $firebaseObject, $firebaseArray, $firebaseAuth) {
    

  $scope.authObj = $firebaseAuth();

  $scope.authObj.$onAuthStateChanged(function(firebaseUser, result) {
    if (firebaseUser) {
      console.log("Signed in as:", firebaseUser.uid);
        var ref = firebase.database().ref();
        var userData = ref.child('users/' + firebaseUser.uid);
        var getData = $firebaseObject(userData);
        $rootScope.currentUser = getData;
    } else {
      console.log(" Signed out ");

    }.then(function(result) {
      if (result) {
        console.log("Signed in as:", result.user.uid);
          var ref = firebase.database().ref();
          var userData = ref.child('users/' + result.user.uid);
          var getData = $firebaseObject(userData);
          $rootScope.currentUser = getData;
      } else {
        console.log("Signed out of facebook");
      }

    })
  });

  $scope.login = function() {
    $scope.authObj.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(firebaseUser) {
      console.log("Signed in as:", firebaseUser.uid);
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  };

  $scope.submit = function() {
    $scope.authObj.$createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
    .then(function(firebaseUser) {

       // var ref = firebase.database().ref();
        // var userData = ref.child('users/' + firebaseUser.uid);
        // var newUser = $firebaseObject(userData)

        // var purchaseHistory = ref.child('users/' + firebaseUser.uid '/purchases');
        // var boughtItmes = $firebaseArray(purchaseHistory)
        
        console.log("User " + firebaseUser.uid + " created successfully!");
        var ref = firebase.database().ref();
        var userData = ref.child('users/' + firebaseUser.uid);

        var newUser = $firebaseObject(userData);
        newUser.email = $scope.user.email;
        newUser.first = $scope.user.first;
        newUser.last = $scope.user.last;
        newUser.password = $scope.user.password;
        newUser.$save()
        .then(function(data) {
          console.log("UserData Added to users in firebase", newUser);
          $rootScope.currentUser = newUser;
          console.log($rootScope.currentUser);
        }).catch(function(error) {
          console.error("UserData Failed to add");
        });

    }).catch(function(error) {
      console.error("Error: ", error);
    }); 
  }




//FACEBOOK 


$scope.facebookSubmit = function() {

   $scope.authObj = $firebaseAuth();

    $scope.authObj.$onAuthStateChanged(function(result) {
      if (result) {
        console.log("Signed in as:", result.user.uid);
          var ref = firebase.database().ref();
          var userData = ref.child('users/' + result.user.uid);
          var getData = $firebaseObject(userData);
          $rootScope.currentUser = getData;
      } else {
        console.log("Signed out of facebook");
      }
    });

  // Create an instance of the Facebook provider object
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('public_profile,email');

  $scope.authObj.$signInWithPopup(provider)
    .then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    console.log("Token = " + token);
    // The signed-in user info.
    var user = result.user;
    console.log("User = " + user);
    console.log("UserID = " + result.user.uid + " created successfully!");
      var ref = firebase.database().ref();
      var userData = ref.child('users/' + firebaseUser.uid);

      var newUser = $firebaseObject(userData);
        newUser.email = result.email;
        newUser.first = result.first_name;
        newUser.last = response.last_name;
        newUser.$save()

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var emailERR = error.email;
      console.log("Email ERROR =" + emailERR);
      // The firebase.auth.AuthCredential type that was used.
      var credentialERR = error.credential;
      console.log("Token ERROR =" + credentialERR);

    });
    
}]);
 $scope.submit = function() {
    $scope.authObj.$createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
    .then(function(firebaseUser) {        
        console.log("User " + firebaseUser.uid + " created successfully!");
        var ref = firebase.database().ref();
        var userData = ref.child('users/' + firebaseUser.uid);

        var newUser = $firebaseObject(userData);
        newUser.email = $scope.user.email;
        newUser.first = $scope.user.first;
        newUser.last = $scope.user.last;
        newUser.password = $scope.user.password;
        newUser.$save()
        .then(function(data) {
          console.log("UserData Added to users in firebase", newUser);
          $rootScope.currentUser = newUser;
          console.log($rootScope.currentUser);
        }).catch(function(error) {
          console.error("UserData Failed to add");
        });

    }).catch(function(error) {
      console.error("Error: ", error);
    }); 
  }







