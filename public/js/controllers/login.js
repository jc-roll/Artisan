myApp.controller('LoginController',
  ['$scope','$rootScope', '$firebaseObject', '$firebase', 'FIREBASE_URL', function($scope, $rootScope, $firebaseObject, $firebase, FIREBASE_URL) {

  ///////////////////////////////////////////Manual Login Options///////////////////////////////////////////////////
  
  $scope.login = function() {
    auth.login($scope.user);
  }; //login 

  $scope.logout = function() {
    Authentication.logout();
  }; //logout

///////////////////////////////////////////Facebook Login Options///////////////////////////////////////////////////
  


  $scope.watchLoginChange = function() {
    var _self = this;
    FB.Event.subscribe('auth.authResponseChange', function(res) {
      if (res.status === 'connected') {
        _self.getUserInfo();
        }
        else {
        }
      });
    }

  $scope.getUserInfo = function() {
    var _self = this;
    FB.api('/me', function(res) {
      $rootScope.$apply(function() {
        $rootScope.user = _self.user = res;
      });
    });
  }

  $scope.logout = function() {
    var _self = this;
    FB.logout(function(response) {
      $rootScope.$apply(function() {
        $rootScope.user = _self.user = {};
      });
    });
  }

  }]);


