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
        $location.path('/home');
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
      auth.$createUserWithEmailAndPassword(email, password)
      .then(function(firebaseUser) {
        console.log("User " + firebaseUser.uid + " created successfully!");
        return auth.$signInWithEmailAndPassword(email, password);
    }).then(function(firebaseUser) {
        console.log("Logged in as:", firebaseUser.uid);
    }).catch(function(error) {
        console.error("Error: ", error);
    });
  }
}

  

}]); //factory
