myApp.controller('AuthCtrl', ['$scope', '$timeout', '$window', '$location', '$firebaseObject', '$firebaseArray', '$firebaseAuth', function($scope, $timeout, $window, $location, $firebaseObject, $firebaseArray, $firebaseAuth) {

    // facebook sdk for grab data from Facebook prfile
    $window.fbAsyncInit = function() {
        FB.init({
          appId: '1812013779036047',
          status: true,
          xfbml: true,
          version: 'v2.6'
        });
    };

    // 1. Auth with pass and email
    $scope.submit = function() {
        firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password).then(function(status) {
            var userData = firebase.database().ref('users/' + $scope.uid).set({
                    name: $scope.name,
                    email: $scope.email,
                    id: $scope.uid
        }).catch(function(error) {
          $scope.$applyAsync(function() {
            $scope.errorMessage = error.message;
          });

        });
    });
      };

    // 2. Auth Facebook
    var provider = new firebase.auth.FacebookAuthProvider();
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

    $scope.logOut = function () {
        firebase.auth().signOut().then(function() {
            console.log('Sign-out successful.');
        }, function(error) {
            console.log('An error happened.');
        });
    };

    $timeout(function () {
        $scope.user = firebase.auth().currentUser;
        if($scope.user) {
            $scope.uid = $scope.user.uid
            $scope.getUsers();
        }
    console.log($scope.user.email);
        }, 200);

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $scope.uid = user.uid;
        firebaseUser = $scope.uid;
        console.log('User is signed in.');
        $scope.getData();
      } else {
        console.log('No user is signed in.');
      }
    });

    $scope.getData = function() {
      var ref = firebase.database().ref('users');
      $scope.users = $firebaseArray(ref);
    };

    $scope.getUsers = function() {
        var ref = firebase.database().ref('users/'+ $scope.uid);

        $scope.users = $firebaseArray(ref);
        console.log($scope.user);
    };

    $scope.setUser = function() {
        firebase.database().ref('users/'+ $scope.uid).set({
            name: $scope.userName,
            email: $scope.userEmail,
            uid: $scope.uid
        });
    };

    $scope.pushUser = function() {
        firebase.database().ref('users/'+$scope.uid).push({
            name: $scope.userName,
            email: $scope.userEmail,
            email: $scope.uid
        }).catch(function (error) {
            console.log(error);
        });
    };

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