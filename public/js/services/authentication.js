myApp.factory('Authentication', 
  ['$rootScope', '$firebaseAuth', '$firebaseObject',
  '$location', 'FIREBASE_URL',
  function($rootScope, $firebaseAuth, $firebaseObject,
    $location, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL);
  // Authenticate Firebase
  var auth = $firebaseAuth(ref); 

  auth.$onAuth(function(authUser) {
    if (authUser) {
      var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid );
      var userObj = $firebaseObject(userRef);
      $rootScope.currentUser = userObj;
    } else {
      $rootScope.currentUser = '';
    }
  });

  return {
    login: function(user) {
      auth.$authWithPassword({
        email: user.email,
        password: user.password
      }).then(function(regUser) {
        $location.path('/login');
      }).catch(function(error) {
       $rootScope.message = error.message;
      });
    }, //login
    
    home: function() {
      $location.path('/home');
    }, //contents

    logout: function() {
      return auth.$unauth();
    }, //logout

    requireAuth: function() {
      return auth.$requireAuth();
    }, //require Authentication

    register: function(user) {
      auth.$createUser({
        email: user.email,
        password: user.password
      }).then(function(regUser) {

        var regRef = new Firebase(FIREBASE_URL + 'users/'+regUser.uid)
        var firebaseUser = $firebaseObject(regRef);
        firebaseUser.firstname = user.firstname;
        firebaseUser.lastname = user.lastname;
        firebaseUser.email = user.email;
        firebaseUser.date = Firebase.ServerValue.TIMESTAMP;
        firebaseUser.$save();

        $rootScope.message = "Hello " + user.firstname +
        ", Thanks for registering you may now log-In!";
      }).catch(function(error) {
        $rootScope.message = error.message;
      }); // //createUser
    } // register
  };

}]); //factory
