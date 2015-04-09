 function UserCtrl($scope, $location, ParseService) {
  // Perform user login using back-end service
	$scope.login = function() {
		ParseService.login($scope.login_username, $scope.login_password, function(user) {
		$location.path('/profile');
    });
	}

  // Perform user signup using back-end service
	$scope.signUp = function() {
		ParseService.signUp($scope.signup_username, $scope.signup_password, function(user) {
     	$location.path('/login');
    });
	}
}
UserCtrl.$inject = ['$scope', '$location', 'ParseService']

function MainCtrl($scope, $location, ParseService){
	$scope.init = function() {
    	$scope.user = ParseService.getUser();
  	}
  	$scope.init();
}
MainCtrl.$inject = ['$scope', '$location', 'ParseService']
