myApp.controller('ProfileCtrl', ['$scope', '$rootScope', '$location', '$firebaseObject', '$firebaseArray', '$firebaseAuth', 'Auth',
  function($scope, $rootScope, $location, $firebaseObject, $firebaseArray, $firebaseAuth, Auth) {
    

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


		$scope.sendPasswordResetEmail = function(){
			var emailAddress = $scope.currentUser.email;

			$scope.authObj.$sendPasswordResetEmail(emailAddress).then(function() {
			  alert("Email sent to registered email address");
			}, function(error) {
			  // An error happened.
			});
	}


$scope.updateName = function() {
      var user = firebase.auth().currentUser;

        user.updateProfile({
        displayName: $scope.user.username,
        email: $scope.user.email,
        phone: $scope.user.phone
}).then(function() {

        firebase.auth().$onAuthStateChanged(callback);




})
}






}]);