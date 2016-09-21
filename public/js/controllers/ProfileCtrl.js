myApp.controller('ProfileCtrl', ['$scope', '$rootScope', '$location', '$firebaseObject', '$firebaseArray', '$firebaseAuth', 'Auth', 'signinWithFacebook',
  function($scope, $rootScope, $location, $firebaseObject, $firebaseArray, $firebaseAuth, Auth, signinWithFacebook) {
    
  $scope.authObj = $firebaseAuth();
  $scope.authObj.$onAuthStateChanged(function(firebaseUser, result) {
    if (firebaseUser) {
      console.log("Signed in as:", firebaseUser.uid);
      console.log(firebaseUser);
        var ref = firebase.database().ref();
        var userData = ref.child('users/' + firebaseUser.uid);
        var getData = $firebaseObject(userData);
        $rootScope.currentUser = getData;
    } else {
      console.log(" Signed out ");
      $rootScope.currentUser = '';
    }
  });

//Not shown
  $rootScope.showMe = false; 
  console.log($scope.showMe);

//This is the switch to show if they are admin
  $scope.showIt = function(){
//currentUser must have a role assigned this can only be done in the db manually placing a child called admin
    if($scope.currentUser.admin != null ) {
//Sets the root scope to true and shows uploader
      $rootScope.showMe = true;
      console.log('working');
      console.log($scope.showMe);
  } else {
    console.log("Sorry but only admins can use that feature");
    alert("Only admins can use that feature log in with admin@admin.com / artisan and give it a try. Alert only for testing it will be in the go live version for school and removed shortly after");
  }
}

	$scope.sendPasswordResetEmail = function(){
		var emailAddress = $scope.currentUser.email;
// The sendPasswordResetEmail grabs the current users email from the db and sends them a email notification
// that the user can then change the pass for the account. This is a built in function and can be modified 
// inside the firebase console.
			$scope.authObj.$sendPasswordResetEmail(emailAddress).then(function() {
			}, function(error) {
			  // An error happened.
			});
	}

  $scope.updateName = function() {
      var user = firebase.auth().currentUser;
        user.updateProfile({
// This function is triggered when the user is inside the profile and types in a new username.
// After placing new data into the input a save button will appear and they can save the new username.
        displayName: $scope.user.username
        }).then(function() {
          firebase.auth().signOut();
          signinWithFacebook.login();
        })
  }
  
  var ref = firebase.database().ref("products");
  $scope.data = $firebaseArray(ref);
  
// Using the addProduct function we pass in the scoped models and add them into the data array 
// is stored in the firebase refrence "products" at base level with the "users"
  $scope.addProduct = function() {
    $scope.data.$add({
      item_Number: $scope.itemNumber,
      store: $scope.location,
      dimensions: $scope.dimensions,
      productInfo: $scope.productInfo,
      image: $scope.croppedDataUrl,
// I decided to add the $ to help with the validation of only numbers it places the $ sign onto the 
// data during the adding process and is stored into the firebase with the $ sign. When I retrieve
// the data later it will still have the $
      price: "$" + $scope.price 

    }).then(function() {
      console.log("Successfully pushed data!");
      $scope.result = "Success!";
    }).catch(function(error) {
      console.log("Error pushing data:", error);
      $scope.result = "Failure: " + error.toString();
    });
  }

}]);