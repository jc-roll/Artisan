myApp.controller('GalleryCtrl', ['$scope', '$rootScope', '$timeout', '$firebaseArray', '$firebaseObject', 'Auth', 
  function ($scope, $rootScope, $timeout, $firebaseArray, $firebaseObject) {


var ref = firebase.database().ref("products" );
  $scope.data = $firebaseArray(ref);
  
// Using the addProduct function we pass in the scoped models and add them into the data array 
// is stored in the firebase refrence "products" at base level with the "users"
  $scope.addProduct = function() {
    $scope.data.$add({
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