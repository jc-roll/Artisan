var myApp = angular.module('myApp',
  ['ngRoute', 'firebase'])
// This is my personal link to my firebaseIo 
  .constant('FIREBASE_URL', "https://finalproject-33408.firebaseio.com"); 

myApp.run(['$rootScope', '$location', '$window',
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


myApp.config(['$routeProvider', function($routeProvider) {
    var config = {
    apiKey: "AIzaSyBapIsFvALXS5Ysgdepi8iql2QNCxDwOFQ",
    authDomain: "finalproject-33408.firebaseapp.com",
    databaseURL: "https://finalproject-33408.firebaseio.com",
    storageBucket: "finalproject-33408.appspot.com",
  };
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    }).
    when('/register', {
      templateUrl: 'views/registration.html',
      controller: 'RegistrationController'
    }).
    when('/home', {
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    }).
    otherwise({
      redirectTo: '/home'
    });
}]);