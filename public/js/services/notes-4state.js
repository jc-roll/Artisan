.run(function($rootScope, $state, error, auth){
    
    // Make $state available in all the views
    $rootScope.$state = $state;
    
    // Listen for errors and display the error message to the user
    error.listen(function(event, err){
        var errObj = typeof(err.error) === 'object' ? err.error : err;
        var errorMessage = errObj.message || errObj.error || errObj;
        alert(errorMessage);
    });
    
    // Handle state change errors
    $rootScope.$on("$stateChangeError", function(event, next, previous, error) {
        if (error === "AUTH_REQUIRED") {
            $state.go("auth.login");
        } else {
            $state.go("home");
        }
    });
    
    /**
     * Logout proxy function
     */
    $rootScope.logout = function(){
        auth.logout();
        $state.go("home");
    };
});