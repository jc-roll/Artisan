myApp.factory("signinWithFacebook", function() {
        var facebookService = [];
        function writeUserData(userId, name, email) {
            firebase.database().ref('users/' + userId)
            .set({
                username: name,
                email: email
            });
        }

    facebookService.login = function() {
      var facebookProvider = new firebase.auth.FacebookAuthProvider();
        // facebookProvider.addScope('public_profile');
        // facebookProvider.addScope('email');

          firebase.auth().signInWithPopup(facebookProvider);
          firebase.auth().onAuthStateChanged(function(user) {
              var user = firebase.auth().currentUser;
              if (user) {
                  //Now we can call the write function to create and set the scope into the fb
                  writeUserData(user.uid, user.displayName, user.email);
                  console.log(firebase.auth().currentUser.displayName);
              } else {
                  console.log("Login Failed");
              }
          });
    };
    return facebookService;
});