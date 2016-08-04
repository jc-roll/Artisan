myApp.controller("RegisterController", ["$scope", "Auth",
  function($scope, Auth, $firebaseObject) {

    $scope.createUser = function() {
      $scope.message = null;
      $scope.error = null;

      // Create a new user
      Auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
        .then(function(firebaseUser) {
          $scope.message = "User created with uid: " + firebaseUser.uid;
        }).catch(function(error) {
          $scope.error = "Error - Login Failed";
        });
    };
}]); // Controller