myApp.controller('RegistrationController',
  ['$scope', 'Authentication',
  function($scope, Authentication) {

  $scope.register = function() {
    Authentication.register($scope.user);
  }; // register creates a new user and adds that information to the firebase

}]); // Controller