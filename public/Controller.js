var app = angular.module("MyApp",[]);
app.controller("MainController", function($scope, MainService, MyFactory){
	
	console.log("controller loaded");
	$scope.funds ={};
	$scope.showSpinner = false;
	$scope.showSuccessMsg = false;
	$scope.fundOptions = MyFactory.getFundOptions();

	$scope.addFund = function(fund){
		var currentDate = new Date();
		var purchaseDate = new Date(fund.purchase_date);
		var limitDate = new Date("Wed Apr 01 2015 00:00:00 GMT+0530 (India Standard Time)");

		if ((currentDate < purchaseDate)) {
			alert("Purchase date should be older than current date");
		}
		else if (purchaseDate < limitDate) {
			alert("allowed purchase date is after"+ limitDate);
		}
		else {
			$scope.showSpinner = true;
			MainService.addFund(fund).then(function(response){
				$scope.funds.push(response.fund);
				$scope.showSpinner = false;
				$scope.showSuccessMsg = true;
			},function(error){
				alert("Something is wrong, try with different parameters : "+error)
			});
		}
	}

	$scope.showAllPurchases = function(){
		MainService.showAllPurchases().then(function(response){
			console.log(response);
			$scope.funds = response.funds;
		},function(error){
			alert("Something is wrong, try with different parameters : "+error)
		});
	}
});