myApp.controller("RegisterController", ["$scope", "Auth", '$firebaseArray', '$firebaseObject',
  function($scope, Auth, $firebaseArray, $firebaseObject) {

    var myDB = new Firebase(FBURL + 'users/' +firebaseData.uid)

    $scope.createUser = function() {
      $scope.message = null;
      $scope.error = null;

      // Create a new user
      Auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
        .then(function() {
        	$scope.user = $firebaseArray(myDB)
          $scope.message = "User created with uid: " + firebaseUser.uid;
        }).catch(function(error) {
          $scope.error = "Error - Login Failed";
        });
    };
}]); // Controller

        	//  var myDB = new Firebase(FBURL + 'users/' +firebaseData.uid)
        	// // var firebaseUser = $firebaseObject(myDB);
        	// // firebaseUser