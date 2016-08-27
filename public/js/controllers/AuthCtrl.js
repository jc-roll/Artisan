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


}]);  

//--------------------- facebook Scope the data ------------------------

$scope.getName = function() {
   facebookService.getName() 
     .then(function(response) {
       $scope.name = response.name;
     }
   );
};

$scope.getLastName = function() {
   facebookService.getLastName() 
     .then(function(response) {
       $scope.last_name = response.last_name;
     }
   );
};
$scope.getFirstName = function() {
   facebookService.getFirstName() 
     .then(function(response) {
       $scope.first_name = response.first_name;
     }
   );
};
$scope.getEmail = function() {
   facebookService.getEmail() 
     .then(function(response) {
       $scope.email = response.email;
     }
   );
};
$scope.getID = function() {
   facebookService.getID() 
     .then(function(response) {
       $scope.id = response.id;
     }
   );
};



//--------------------- facebook Factory ------------------------



myApp.factory('facebookService', function($q) {
    return {
        getName: function() {
            var deferred = $q.defer();
            FB.api('/me', {fields: 'name'}, function(response) {
                if (!response || response.error) {deferred.reject('Error occured');
                } else {deferred.resolve(response);
                }
            });
                return deferred.promise;
        }
        getFirstName: function() {
            var deferred = $q.defer();
            FB.api('/me', {fields: 'first_name'}, function(response) {
                if (!response || response.error) {deferred.reject('Error occured');
                } else {deferred.resolve(response);
                }
            });
                return deferred.promise;
        }
        getLastName: function() {
            var deferred = $q.defer();
            FB.api('/me', {fields: 'last_name'}, function(response) {
                if (!response || response.error) {deferred.reject('Error occured');
                } else {deferred.resolve(response);
                }
            });
                return deferred.promise;
        }
        getEmail: function() {
            var deferred = $q.defer();
            FB.api('/me', {fields: 'email'}, function(response) {
                if (!response || response.error) {deferred.reject('Error occured');
                } else {deferred.resolve(response);
                }
            });
                return deferred.promise;
        }
        getID: function() {
            var deferred = $q.defer();
            FB.api('/me', {fields: 'id'}, function(response) {
                if (!response || response.error) {deferred.reject('Error occured');
                } else {deferred.resolve(response);
                }
            });
                return deferred.promise;
        }
    }
});
//--------------------- facebook key functions ------------------------


                    window.fbAsyncInit = function() {
                      FB.init({
                        appId      : '1812013779036047',
                        status     : true, 
                        cookie     : true,  // enable cookies to allow the server to access 
                        xfbml      : true,  // parse social plugins on this page
                        version    : 'v2.5' // use graph api version 2.5
                      })
                      FB.getLoginStatus(function(response) {
                        statusChangeCallback(response);
                      })

                    }// END OF <WINDOW>

    function facebookLogin() {
      FB.login(function(response) {
        var token = response.authResponse.accessToken;
        var uid = response.authResponse.userID;
        if (response.authResponse) {
          console.log('Welcome!  Fetching your information.... ');
          FB.api('/me', 'get', { access_token: token, fields: 'id,name,gender,email,last_name' }, 
            function(response) {
            console.log(response);
          });
          } else {
            console.log('User cancelled login or did not fully authorize.');
          }
        });
      }

    function statusChangeCallback(response) {
      console.log('Checking facebook status');
      console.log(response);
      if (response.status === 'connected') {
      } else if (response.status === 'not_authorized') {
        document.getElementById('status').innerHTML = 'Please log ' +
          'into this app.';
      } else {
        document.getElementById('status').innerHTML = 'Please log ' +
          'into Facebook.';
      }
    }



    function checkLoginState() {
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
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
  
