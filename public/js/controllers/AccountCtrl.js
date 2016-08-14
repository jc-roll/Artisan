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