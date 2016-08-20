myApp.controller('AuthCtrl', ['$scope', '$rootScope', '$timeout', '$window', '$location', '$firebaseAuth', function($scope, $rootScope, $timeout, $window, $location, $firebaseAuth) {
    


    myApp.factory("Auth", ["$firebaseAuth",
        function($firebaseAuth) {
        return $firebaseAuth();

}]);
    // // facebook sdk for grab data from Facebook prfile
    // $window.fbAsyncInit = function() {
    //     FB.init({
    //       appId: '1812013779036047',
    //       status: true,
    //       xfbml: true,
    //       version: 'v2.6'
    //     });
    // };


    var ref = firebase.database().ref();
    var refOne = firebase.database().ref('users');
    var refTwo = firebase.database().ref('users/' + $scope.uid);
    var userRef = ref.child('users/'+ $scope.uid);



    $rootScope.authData = $firebaseAuth();

    $scope.authData.$onAuthStateChanged(function(user) {
      if (user) {
        $rootScope.currentUser = user;
        console.log('User is signed in.' + $scope.uid);
      } else {
        $rootScope.currentUser = null;
        console.log('No user is signed in.');
      };
    });


    // Auth with pass and email

    var ref = firebase.database().ref();
    var userRef = ref.child('users/'+ $scope.uid);


    $scope.submit = function() {
        console.log($scope.userData);
        $scope.authData.$createUserWithEmailAndPassword($scope.userData.email, $scope.userData.password).then(function(firebaseUser) {
            userRef.set({
                name: $scope.userData.name,
                email: $scope.userData.email,
                id: $scope.uid
        }).catch(function(error) {
            console.log("User did not establish connection to FB");
            $scope.errorMessage = error.message;
            });
        });
    };      
      
    $scope.login = function(){
        $scope.authData.$signInWithEmailAndPassword($scope.userData.email, $scope.userData.password).then(function(firebaseUser) {
            console.log("Signed in as:", firebaseUser.uid);
            $location.path('/home');
        }).catch(function(error) {
            $scope.error = error;
        });
    };

    $scope.getData = function() {
      var ref = firebase.database().ref('users');
      $scope.users = $firebaseArray(ref);
    };

    $scope.getUsers = function() {
        var ref = firebase.database().ref('users/'+ $scope.uid);
        $scope.users = $firebaseArray(ref);
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

    $scope.signOut = function(){
    $firebaseAuth().$signOut().then(function() {
            console.log('Sign-out successful.');
        }, function(error) {
            console.log('An error happened.');
        });
    };



 // // 2. Auth Facebook
 //    var provider = new firebase.auth.FacebookAuthProvider();
 //    provider.addScope('email');
 //    provider.addScope('user_friends');

 //    $scope.facebook = function () {
 //        // firebase.auth().signInWithRedirect(provider);
 //        firebase.auth().signInWithPopup(provider).then(function(result) {
 //          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
 //          var token = result.credential.accessToken;
 //          console.log(token);
 //          // The signed-in user info.
 //          var user = result.user;
 //          // ...
 //        }).catch(function(error) {
 //          // Handle Errors here.
 //          var errorCode = error.code;
 //          var errorMessage = error.message;
 //          // The email of the user's account used.
 //          var email = error.email;
 //          // The firebase.auth.AuthCredential type that was used.
 //          var credential = error.credential;
 //          // ...
 //        });
 //    };

 //    $scope.logOut = function () {
 //        firebase.auth().signOut().then(function() {
 //            console.log('Sign-out successful.');
 //        }, function(error) {
 //            console.log('An error happened.');
 //        });
 //    };


 //    /*------------------------------------*\
 //        Facebook SDK
 //    \*------------------------------------*/

 //    $scope.getFacebookInfo = function () {
 //        FB.api(
 //           "/me",
 //            function (response) {
 //                console.log(response);
 //              if (response && !response.error) {
 //                /* handle the result */
 //              }
 //            }
 //        );
 //    };
}]);

