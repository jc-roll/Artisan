app.controller('RegisterCtrl', ['$scope', function($scope) {
    $scope.submit = function() {
        firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password).then(function(status) {
            console.log(status);
        }).catch(function(error) {
            $scope.$applyAsync(function() {
                $scope.errorMessage = error.message;
            });
          console.log(error);
        });
    };
}]);