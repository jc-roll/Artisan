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
