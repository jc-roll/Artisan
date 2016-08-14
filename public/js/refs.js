 // 2. Auth Facebook
    var provider = new firebase.auth.FacebookAuthProvider();
    // Permissions
    provider.addScope('email');
    provider.addScope('user_friends');

    $scope.facebook = function () {
        // firebase.auth().signInWithRedirect(provider);
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          console.log(token);
          // The signed-in user info.
          var user = result.user;
          // ...
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    };

    // Log Out
    $scope.logOut = function () {
        firebase.auth().signOut().then(function() {
            console.log('Sign-out successful.');
        }, function(error) {
            console.log('An error happened.');
        });
    };



/*------------------------------------*\
        DATA
    \*------------------------------------*/


    // Get Data from collection json
    $scope.getData = function() {
      var ref = firebase.database().ref('users/' + $scope.user);
      $scope.user = $firebaseArray(ref);
      console.log($scope.data);
    };


    // Get users form users json
    $scope.getUsers = function() {
        var ref = firebase.database().ref('users/'+ $scope.uid);

        $scope.users = $firebaseArray(ref);
        console.log($firebaseArray(ref));

    };



    // Add new Data to Users (Перезаписывает весь json users)
    $scope.setUser = function() {
        firebase.database().ref('users/').set({
            name: $scope.displayName,
            email: $scope.userEmail,
            uid: $scope.uid
        });
    };

    // Add new Data to Users (добавляет новый json users)
    $scope.pushUser = function() {
        firebase.database().ref('users/'+$scope.uid).push({
            name: $scope.displayName,
            email: $scope.userEmail,
            email: $scope.uid
        }).catch(function (error) {
            console.log(error);
        });
    };


    // UPDATE
    $scope.updateUser = function(user) {
        var postData = {
            name: 'updateName',
            email: 'updatedEmail'
          };
          // var key = firebase.database().ref().child('users').push().key
          firebase.database().ref('users/'+ $scope.uid +"/" + user.$id).update(postData);
        // firebase.database().ref('users/').update({
        //     name: $scope.userName,
        //     email: $scope.userEmail
        // });
    };

    // DELETE
    $scope.deleteUser = function(user) {
        // $scope.users.delete(user);
        firebase.database().ref('users/'+ $scope.uid +"/" + user.$id).remove();
    };


    /*------------------------------------*\
        Facebook SDK
    \*------------------------------------*/

    $scope.getFacebookInfo = function () {
        FB.api(
           "/me",
            function (response) {
                console.log(response);
              if (response && !response.error) {
                /* handle the result */
              }
            }
        );
    };
}]);

myApp.controller("LoginCtrl", ["currentAuth", "$scope", "Auth", "$route", function(currentAuth, $scope, Auth, $route) {
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not signed in
  $scope.auth = Auth;

  $scope.login = function(){
    Auth.$signInAnonymously().then(function(firebaseUser){
        $scope.user = firebaseUser;
      }).catch(function(error) {
        $scope.error = error;
      });
  };

  $scope.signOut = function(){
    Auth.$signOut()
  };

  $scope.auth.$onAuthStateChanged(function(firebaseUser){
    $scope.user = firebaseUser;
    //$route.reload();
    console.log("state change");
  });

  //console.log($scope.auth);
  //console.log($scope.currentAuth);
  //console.log(Auth.$requireSignIn());
}]);

myApp.controller("HomeCtrl", ["currentAuth", "$scope", "Auth", "$route", function(currentAuth, $scope, Auth, $route) {
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not signed in

  $scope.signOut = function(){
    console.log($scope.user);
    Auth.$signOut();
  }

  Auth.$onAuthStateChanged(function(firebaseUser) {
    $scope.user = firebaseUser;
    console.log(firebaseUser);
    //if user is logged out go back to login page
    if(firebaseUser === "" || firebaseUser === null){
      $route.reload();
    }
  });

  //$route.reload();
  console.log("HomeCtrl");
  //console.log($scope.currentAuth);
  //console.log(Auth.$requireSignIn());
}]);

myApp.controller("AccountCtrl", ["currentAuth", "$scope", "Auth", "$route", function(currentAuth, $scope, Auth, $route) {
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not signed in

  $scope.auth = Auth;
    console.log("In Account Controller: "+ currentAuth);

  $scope.signOut = function(){
    Auth.$signOut();
    $route.reload();
  };

  $scope.auth.$onAuthStateChanged(function(firebaseUser) {
    $scope.user = firebaseUser;
    //$route.reload();
    console.log("in account controller state change");
    if(firebaseUser === "" || firebaseUser === null){
      $route.reload();
    }  
  }); 

}]);
