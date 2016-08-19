myApp.controller("HomeCtrl", ["currentAuth", "$scope", "Auth", "$route", function(currentAuth, $scope, Auth, $route) {

  $scope.currentAuth = currentAuth;
  console.log("USER Auth :", $scope.currentAuth);

 
}]);
