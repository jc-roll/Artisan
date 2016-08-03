myApp.controller('LoginController',
  ['$scope','$rootScope', '$firebaseObject', '$firebase', 'FIREBASE_URL', function($scope, $rootScope, $firebaseObject, $firebase, FIREBASE_URL) {


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

// function($rootScope, $location, $window) {
// $rootScope.user = {};
//     $window.fbAsyncInit = function() {
//       // Executed when the SDK is loaded
//       FB.init({
//         appId: '1812013779036047',
//         channelUrl: 'https://finalproject-33408.firebaseapp.com/__/auth/handler ',
//         status: true,
//         cookie: true,
//         xfbml: true
//       });
      
//     };

//   (function(d){
//     // load the Facebook javascript SDK
//     var js,
//     id = 'facebook-jssdk',
//     ref = d.getElementsByTagName('script')[0];
//     if (d.getElementById(id)) {
//       return;
//     }
//     js = d.createElement('script');
//     js.id = id;
//     js.async = true;
//     js.src = "//connect.facebook.net/en_US/all.js";

//     ref.parentNode.insertBefore(js, ref);

//   }(document));

  
  }]);


