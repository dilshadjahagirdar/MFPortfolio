var app = angular.module("MyApp",[]);
app.controller("MainController", function($scope, MainService){
	
	console.log("controller loaded");
	$scope.fund ={};
	$scope.funds ={};
	$scope.showSpinner = false;
	$scope.addFund = function(fund){
		$scope.showSpinner = true;
		console.log(fund)
		MainService.addFund(fund)
		.then(
			function(response){
				$scope.funds = response;
				$scope.showSpinner = false;
			},
			function(error){
				console.log(error);
			}
		);
	}

});