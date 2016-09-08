myApp.controller('GalleryCtrl', ['$scope', '$timeout', '$firebaseArray', function ($scope, $timeout, $firebaseArray) {


    // $scope.productGalleryAdd = function(){
    //   productGalleryAdd.upload();
    // }

    var list = $firebaseArray(ref);
      list.$add({ foo: "bar" }).then(function(ref) {
        var id = ref.key;
        console.log("added record with id " + id);
        list.$indexFor(id); // returns location in the array
      });

}]);