myApp.controller('AuthCtrl', ['$scope', '$rootScope', '$timeout', '$window', '$location', '$firebaseObject', '$firebaseArray', '$firebaseAuth', function($scope, $rootScope, $timeout, $window, $location, $firebaseObject, $firebaseArray, $firebaseAuth) {
    

  $scope.authObj = $firebaseAuth();

  $scope.authObj.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      console.log("Signed in as:", firebaseUser.uid);
        var ref = firebase.database().ref();
        var userData = ref.child('users/' + firebaseUser.uid);
        var getData = $firebaseObject(userData);
        $rootScope.currentUser = getData;
    } else {
      console.log("Signed out");

    }
  });

  $scope.login = function() {
    $scope.authObj.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(firebaseUser) {
      console.log("Signed in as:", firebaseUser.uid);
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  };

  $scope.submit = function() {
    $scope.authObj.$createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
    .then(function(firebaseUser) {

       // var ref = firebase.database().ref();
        // var userData = ref.child('users/' + firebaseUser.uid);
        // var newUser = $firebaseObject(userData)

        // var purchaseHistory = ref.child('users/' + firebaseUser.uid '/purchases');
        // var boughtItmes = $firebaseArray(purchaseHistory)
        
        console.log("User " + firebaseUser.uid + " created successfully!");
        var ref = firebase.database().ref();
        var userData = ref.child('users/' + firebaseUser.uid);

        var newUser = $firebaseObject(userData);
        newUser.email = $scope.user.email;
        newUser.first = $scope.user.first;
        newUser.last = $scope.user.last;
        newUser.password = $scope.user.password;
        newUser.$save()
        .then(function(data) {
          console.log("UserData Added to users in firebase", newUser);
          $rootScope.currentUser = newUser;
          console.log($rootScope.currentUser);
        }).catch(function(error) {
          console.error("UserData Failed to add");
        });

    }).catch(function(error) {
      console.error("Error: ", error);
    }); 
  }


  $scope.facebook = function() {
    $scope.authObj.$signInWithPopup("facebook").then(function(result) {
      console.log('Welcome!  Fetching your information.... ');
      console.log("Signed in as:", result.user.uid);
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  }

}]);  

  // This is called with the results from from FB.getLoginStatus().
    function statusChangeCallback(response) {
      console.log('statusChangeCallback');
      console.log(response);
      // The response object is returned with a status field that lets the
      // app know the current login status of the person.
      // Full docs on the response object can be found in the documentation
      // for FB.getLoginStatus().
      if (response.status === 'connected') {
        var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;
        console.log('Good to see you, ' + response.name + '.');
      } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Please log ' +
          'into this app.';
      } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Please log ' +
          'into Facebook.';
      }
    }

    function checkLoginState() {
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
    }
 
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '1812013779036047',
          cookie     : true,  // enable cookies to allow the server to access 
          xfbml      : true,  // parse social plugins on this page
          version    : 'v2.5' // use graph api version 2.5
        })
      }
     

      
          
  // $scope.submit = function() {
  //   $scope.authObj.$createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
  //   .then(function(firebaseUser) {

  //      // var ref = firebase.database().ref();
  //       // var userData = ref.child('users/' + firebaseUser.uid);
  //       // var newUser = $firebaseObject(userData)

  //       // var purchaseHistory = ref.child('users/' + firebaseUser.uid '/purchases');
  //       // var boughtItmes = $firebaseArray(purchaseHistory)
        
  //       console.log("User " + firebaseUser.uid + " created successfully!");
  //       var ref = firebase.database().ref();
  //       var userData = ref.child('users/' + firebaseUser.uid);

  //       var newUser = $firebaseObject(userData);
  //       newUser.email = $scope.user.email;
  //       newUser.first = $scope.user.first;
  //       newUser.last = $scope.user.last;
  //       newUser.password = $scope.user.password;
  //       newUser.$save()
  //       .then(function(data) {
  //         console.log("UserData Added to users in firebase", newUser);
  //         $rootScope.currentUser = newUser;
  //         console.log($rootScope.currentUser);
  //       }).catch(function(error) {
  //         console.error("UserData Failed to add");
  //       });

  //   }).catch(function(error) {
  //     console.error("Error: ", error);
  //   }); 
  // };

  //       FB.login(function(response) {
  //         if (response.authResponse) {
  //           console.log('Welcome!  Fetching your information.... ');
  //             FB.api('/me', function(response) {
  //               var ref = firebase.database().ref();
  //               var userData = ref.child('users/' + response.uid);
  //               var newUser = $firebaseObject(userData);
  //               newUser.email = email;
  //               newUser.first = first_name;
  //               newUser.last = last_name;
  //               newUser.password = password;
  //               newUser.$save()
  //               }).then(function(data) {
  //                 console.log("UserData Added to users in firebase", newUser);
  //                 $rootScope.currentUser = newUser;
  //                 console.log($rootScope.currentUser);
  //               } else if (response.authResponse === null) {
  //                 } else {
  //                 })
  //               }
  //             })
  
