var app = angular.module("MyApp");
app.service("MainService", function($http, $q){
	
	console.log("service loaded");
	
	this.addFund = function(fund){
		console.log(fund)
		var deferred = $q.defer();
		$http.post('/funds',fund).then(function(response){
			deferred.resolve(response.data);

		}, function(error){
			console.log(error);
			deferred.reject(response.data);
		});
		return deferred.promise;				
	}


	this.showAllPurchases = function(){
		var deferred = $q.defer();
		$http.get('/funds').then(function(response){
			deferred.resolve(response.data);
		},function(error){
			deferred.reject(response.data);
		});
		return deferred.promise;
	}
});