myApp.controller('GalleryCtrl', ['$scope', '$rootScope', '$timeout', '$firebaseArray', '$firebaseAuth', '$firebaseObject', 'Auth', 
  function ($scope, $rootScope, $timeout, $firebaseArray, $firebaseAuth, $firebaseObject, Auth) {
  
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