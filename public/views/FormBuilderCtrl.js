
myApp.controller('FormBuilderCtrl', ['$scope', '$rootscope', '$firebaseObject', '$firebaseArray', 'dynamicFormBuild',
function ($scope, $rootScope, $firebaseObject, $firebaseArray, dynamicFormBuild) {
	



$scope.saveFormPreferences = function() {
	
}


  <form ng-submit="submit()" name={{user.formName}} >
      <h1>{{user.}}</h1>
      <div class="">
        <label>{{user.labelOne}}</label>
          <input type={{user.inputOne.type}} name={{user.inputOne.name}} ng-model={{user.inputOne.model}} placeholder={{user.inputOne.placeholder}} ng-required={{user.inputOne.required}}>
          <p class="" ng-show="myform.{{user.inputOne.name}}.$invalid && myform.{{user.inputOne.name}}.$touched">{{user.inputOne.Error_Validation}}</p>
      </div>
      <div class="">
        <label>{{user.labelTwo}}:</label>
          <input type={{user.inputTwo.type}} name={{user.inputTwo.name}} ng-model={{user.inputTwo.model}} placeholder={{user.inputTwo.placeholder}} ng-required={{user.inputTwo.required}}>
          <p class="error validationerror"
        ng-show="myform.{{user.inputTwo.name}}.$invalid && myform.{{user.inputTwo.name}}.$touched">{{user.inputTwo.Error_Validation}}</p>
      </div>



{{user.formName}}
inputTwo.

               
               	  
           
                headerOne : $scope.headerOne.name;
								inputOne : $scope.inputOne = ;
								inputOne.type : $scope.inputOne.type;
								inputOne.name : $scope.inputOne.name;
								inputOne.ng-model : $scope.inputOne.ng-model;
								inputOne.placeholder : $scope.inputOne.placeholder;
								inputOne.!valid : $scope.inputOne.Error_Validation;
								inputTwo.type : $scope.inputTwo.type;
								inputTwo.name : $scope.inputTwo.name;
								inputTwo.ng-model : $scope.inputTwo.ng-model;
								inputTwo.placeholder : $scope.inputTwo.placeholder;
								inputTwo.!valid : $scope.inputTwo.Error_Validation;
								inputThree.type : $scope.inputThree.type;
								inputThree.name : $scope.inputThree.name;
								inputThree.ng-model : $scope.inputThree.ng-model;
								inputThree.placeholder : $scope.inputThree.placeholder;
								inputThree.!valid : $scope.inputThree.Error_Validation;
            });
        }


                           var newUser = $firebaseObject(userData);
                                  newUser.email = response.email;
                                  newUser.first = response.first_name;
                                  newUser.last = response.last_name;
                                  newUser.$save() 



	formName = response.formName;
	headerOne = $scope.headerOne;
	headerOne.class = $scope.headerOne.class;
	inputOne.type = $scope.inputOne.type;
	inputOne.name = $scope.inputOne.name;
	inputOne.ng-model = $scope.inputOne.ng-model;
	inputOne.placeholder = $scope.inputOne.placeholder;
	inputOne.!valid = $scope.inputOne.Error_Validation;
	inputTwo.type = $scope.inputTwo.type;
	inputTwo.name = $scope.inputTwo.name;
	inputTwo.ng-model = $scope.inputTwo.ng-model;
	inputTwo.placeholder = $scope.inputTwo.placeholder;
	inputTwo.!valid = $scope.inputTwo.Error_Validation;
	inputThree.type = $scope.inputThree.type;
	inputThree.name = $scope.inputThree.name;
	inputThree.ng-model = $scope.inputThree.ng-model;
	inputThree.placeholder = $scope.inputThree.placeholder;
	inputThree.!valid = $scope.inputThree.Error_Validation;

}])
