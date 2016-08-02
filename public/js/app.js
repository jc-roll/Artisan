var myApp = angular.module('myApp',
  ['ngRoute', 'firebase'])
// This is my personal link to my firebaseIo 
  .constant('FIREBASE_URL', "https://finalproject-33408.firebaseio.com/"); 



myApp.run(['$rootScope', '$location', '$window', 'srvAuth',
  function($rootScope, $location, $window, sAuth) {
    $rootScope.user = {};
    $window.fbAsyncInit = function() {
      // Executed when the SDK is loaded
      FB.init({
        /*
         The app id of the web app;
         To register a new app visit Facebook App Dashboard
         ( https://developers.facebook.com/apps/ )
        */
        appId: '1812013779036047',
        /*
         Adding a Channel File improves the performance
         of the javascript SDK, by addressing issues
         with cross-domain communication in certain browsers.
        */
        channelUrl: 'app/channel.html',
        /*
         Set if you want to check the authentication status
         at the start up of the app
        */
        status: true,
        /*
         Enable cookies to allow the server to access
         the session
        */
        cookie: true,
        /* Parse XFBML */
        xfbml: true
      });
      sAuth.watchAuthenticationStatusChange();
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
    databaseURL: "https://finalproject-33408.firebaseio.com/",
    storageBucket: "finalproject-33408.appspot.com",
  };
  firebase.initializeApp(config);
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    }).
    when('/register', {
      templateUrl: 'views/register.html',
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