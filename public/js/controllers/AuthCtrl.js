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
      console.log(" Currently signed out of site login");

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


      window.fbAsyncInit = function() {
                      FB.init({
                        appId      : '1812013779036047',
                        cookie     : true,  // enable cookies to allow the server to access 
                        xfbml      : true,  // parse social plugins on this page
                        version    : 'v2.5' // use graph api version 2.5
                      })
                       FB.getLoginStatus(function(response) {
                        checkLoginState(response);
         
                          });

                       

                    }// END OF <WINDOW>



    facebookLogin = function() {
      var facebook = new firebase.auth.FacebookAuthProvider();
      $scope.authObj.$signInWithPopup(facebook).then(function(response) {
        var token = response.authResponse.accessToken;
        var uid = response.authResponse.userID;
        if (response.authResponse) {
  
          } else {
            console.log('User cancelled login or did not fully authorize.');
          }
    })

    }
   


    statusChangeCallback = function(response) {
      console.log('Checking facebook status');
      console.log(response);
      if (response.status === 'connected') {
        facebookLogin();
      } else if (response.status === 'not_authorized') {
        document.getElementById('status').innerHTML = 'Please log ' +
          'into this app.';
      } else {
        document.getElementById('status').innerHTML = 'Please log ' +
          'into Facebook.';
      }
    }

      checkLoginState = function() {
          FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
          });
        }
 

}]);












