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
