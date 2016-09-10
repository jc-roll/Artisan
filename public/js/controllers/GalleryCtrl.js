myApp.controller('GalleryCtrl', ['$scope', '$rootScope', '$timeout', '$firebaseArray', '$firebaseObject', 'Auth', 
  function ($scope, $rootScope, $timeout, $firebaseArray, $firebaseObject) {


var ref = firebase.database().ref("products" );
  
  $scope.data = $firebaseArray(ref);
  
  $scope.addProduct = function() {
    $scope.data.$add({
      dimensions: $scope.dimensions,
      productInfo: $scope.productInfo,
      image: $scope.croppedDataUrl,
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