myApp.controller('RegistrationController',
  [ 'Authentication',
  function(Authentication) {
  
  $scope.login = function() {
    Authentication.login($scope.user);
  }; //login 

  $scope.logout = function() {
    Authentication.logout();
  }; //logout

  $scope.register = function() {
    Authentication.register($scope.user);
  }; // register creates a new user and adds that information to the firebase

}]); // Controller