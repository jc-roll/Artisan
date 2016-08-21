myApp.controller('AuthCtrl', ['$scope', '$rootScope', '$timeout', '$window', 'currentAuth', '$location', '$firebaseObject', '$firebaseArray', '$firebaseAuth', function($scope, $rootScope, $timeout, $window, currentAuth, $location, $firebaseObject, $firebaseArray, $firebaseAuth) {
     // // facebook sdk for grab data from Facebook prfile
    // $window.fbAsyncInit = function() {
    //     FB.init({
    //       appId: '1812013779036047',
    //       status: true,
    //       xfbml: true,
    //       version: 'v2.6'
    //     });
    // };

  $scope.authObj = $firebaseAuth();

  var firebaseUser = $scope.authObj.$getAuth();

  if (firebaseUser) {
    console.log("Signed in as:", firebaseUser.uid);
  } else {
    console.log("Signed out");
  }

  $scope.authObj.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      console.log("Signed in as:", firebaseUser.uid);
    } else {
      console.log("Signed out");
    }
  });

  $scope.login = function() {
    $scope.authObj.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(firebaseUser) {
      console.log("Signed in as:", firebaseUser.uid);
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  };

  $scope.facebook = function() {
    $scope.authObj.$signInWithPopup("facebook").then(function(result) {
      console.log("Signed in as:", result.user.uid);
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  };

  $scope.submit = function() {
    $scope.authObj.$createUserWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(firebaseUser) {
        console.log("User " + firebaseUser.uid + " created successfully!");
      }).catch(function(error) {
        console.error("Error: ", error);
      });
  };








    // $firebaseAuth().$onAuthStateChanged(function(authUser) {
    //   if (authUser) {
    //     var ref = firebase.database().ref();
    //     var userRef = ref.child('users/' + authUser.uid);
    //     var userObj = $firebaseObject(userRef);

    //     $rootScope.currentUser = userObj;
    //     console.log('User is signed in.');
    //   } else {
    //     $rootScope.currentUser = '';
    //     console.log('No user is signed in.');
    //   };
    // });



    // Auth with pass and email
   //  var ref = firebase.database().ref();
   //  var submitRef = ref.child('users/' + userId );

   //  $scope.submit = function() {
   //      $firebaseAuth().$createUserWithEmailAndPassword(
   //          $scope.user.email, 
   //          $scope.user.password
   //      ).then(function(firebaseUser) {
   //          submitRef.set({
   //              FirstName: $scope.user.first,
   //              LastName: $scope.user.last,
   //              email: $scope.user.email,
   //              });
   //      }).catch(function(error) {
   //        $scope.$applyAsync(function() {
   //          $scope.errorMessage = error.message;
   //        });
   //      });
   // };

}]);
