myApp.controller('AuthCtrl', ['$scope', '$timeout', '$window', '$location', '$cookies', '$firebaseObject', '$firebaseArray', '$firebaseAuth', function($scope, $timeout, $window, $location, $cookies, $firebaseObject, $firebaseArray, $firebaseAuth) {

    // facebook sdk for grab data from Facebook prfile
    $window.fbAsyncInit = function() {
        FB.init({
          appId: '1812013779036047',
          status: true,
          cookie: true,
          xfbml: true,
          version: 'v2.6'
        });
    };

    /*------------------------------------*\
        AUTH
    \*------------------------------------*/

    // 1. Auth with pass and email
    $scope.submit = function() {
        // $scope.email = 'lollipop.fly@gmail.com';
        // $scope.password = 'kerbalcrasauders1';

        firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).then(function(user) {
            console.log(user);
        }).catch(function(error) {
          // Handle Errors here.
          $scope.$applyAsync(function() {
            $scope.errorMessage = error.message;
          });
        });
    };

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

    // If user Logged in v1
    // $timeout(function () {
    //     $scope.user = firebase.auth().currentUser;
    //     if($scope.user) {
    //         $scope.uid = $scope.user.uid
    //         $scope.getUsers();
    //     }
    // console.log($scope.user);
    //     }, 200);

    // If user Logged in v2
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     $scope.uid = user.uid;
    //     console.log($scope.uid);
    //     // User is signed in.
    //     console.log('User is signed in.');
    //     $scope.getUsers();
    //     // console.log(firebase.auth().currentUser);
    //   } else {
    //     // No user is signed in.
    //     console.log('No user is signed in.');
    //   }
    // });

    /*------------------------------------*\
        DATA
    \*------------------------------------*/


    // Get Data from collection json
    $scope.getData = function() {
      var ref = firebase.database().ref('collection/');
      $scope.data = $firebaseArray(ref);
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
            name: $scope.userName,
            email: $scope.userEmail,
            uid: $scope.uid
        });
    };

    // Add new Data to Users (добавляет новый json users)
    $scope.pushUser = function() {
        firebase.database().ref('users/'+$scope.uid).push({
            name: $scope.userName,
            email: $scope.userEmail,
            uid: $scope.uid
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