myApp.factory("signinWithFacebook", function() {
  var facebookService = [];
//writeUserData was triggered in the facebookService function login now that we have authenticated
//with the popup using the provider and set the data = currentUser we can now save that data using 
//.set we will save the data in the same location as other providers or manualy created users.
  function writeUserData(userId, name, email, photoURL) {
    firebase.database().ref('users/' + userId)
    .set({
      username: name,
      email: email,
      photoURL: photoURL
    });
  }

  facebookService.login = function() {

    var facebookProvider = new firebase.auth.FacebookAuthProvider();
//signINWithPopup prompts the set provider in this case facebook and pops up a window asking for
//the user to log into that provider it uses tokens and authenticates the user. Firebase uses a 
//built in function that takes care of the tokens and bulk code for us.
    firebase.auth().signInWithPopup(facebookProvider);
//Sets the provider data of user to = the currentUser and inherent the scope.
    firebase.auth().onAuthStateChanged(function(user) {
      var user = firebase.auth().currentUser;
      if (user) {
//Now we can call the write function to create and set the scope into the fb
//This triggers that function
        writeUserData(user.uid, user.displayName, user.email, user.photoURL);
          console.log(firebase.auth().currentUser.displayName);
          window.location = "#/home";
        } else {
          console.log("Login Failed");
        }
    });
  };
  return facebookService;
});

