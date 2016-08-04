myApp.controller('LoginController', ['$scope', 'Auth', 'currentAuth', 
  function($scope, Auth, currentAuth) {

    var provider = new firebase.auth.FacebookAuthProvider();
    $scope.provider = provider;
    $scope.auth = Auth;

    // any time auth state changes, add the user data to scope
    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
      $scope.firebaseUser = firebaseUser;
    });
  }

  $scope.watchLoginChange = function() {
    FB.Event.subscribe('auth.authResponseChange', function(res) {
      if (res.status === 'connected') {
        _this.getUserInfo();
        }
        else {
        }
      });
    }

  $scope.getUserInfo = function() {
    FB.api('/me', function(res) {
      $rootScope.$apply(function() {
        $rootScope.user = _this.user = res;
      });
    });
  }

  $scope.logout = function() {
    FB.logout(function(response) {
      $rootScope.$apply(function() {
        $rootScope.user = _this.user = {};
      });
    });
  }

  function($rootScope, $location, $window) {
  $rootScope.user = {};
      $window.fbAsyncInit = function() {
        // Executed when the SDK is loaded
        FB.init({
          appId: '1812013779036047',
          channelUrl: 'https://finalproject-33408.firebaseapp.com/__/auth/handler ',
          status: true,
          cookie: true,
          xfbml: true
        });
        
      };

    (function(d){
      // load the Facebook javascript SDK
      var js,
      id = 'facebook-jssdk',
      ref = d.getElementsByTagName('script')[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement('script');
      js.id = id;
      js.async = true;
      js.src = "//connect.facebook.net/en_US/all.js";

      ref.parentNode.insertBefore(js, ref);

    }(document));


  }]);


