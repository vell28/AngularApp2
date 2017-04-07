'use strict';

/* Controllers */
var phonecatApp = angular.module('phonecatApp', ['ngRoute']);

phonecatApp.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider){
    $routeProvider
        .when('/',{
          templateUrl:'template/home.html',
          controller:'PhoneListCtrl'
        })
        .when('/about',{
          templateUrl:'template/about.html',
          controller:'AboutCtrl'
        })
        .when('/contact',{
          templateUrl:'template/contacts.html',
          controller:'ContactCtrl'
        })
        .when('/phones/:phoneId', {
          templateUrl:'template/phone-detail.html',
          controller:'PhoneDetailCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
}]);
phonecatApp.controller('PhoneListCtrl',['$scope','$http','$location',function($scope, $http, $location){
	$scope.title = 'Телефоны';

	$http.get("phones/phones.json").then(function(responce){
		$scope.phones = responce.data;
	})

	$scope.doneAndFilter = function(phoneItem){
		return phoneItem.name && phoneItem.status === true;
	};

	$scope.sortField = undefined;
	$scope.reverse = false;

	$scope.sort = function(fieldName){
		if($scope.sortField === fieldName){
			$scope.reverse = !$scope.reverse;
		}else{
			$scope.sortField = fieldName;
			$scope.reverse = false;
		}
	};
	$scope.carts = [];
	$scope.addCart = function(id, num, imageUrl, name, price){
		var nums = num || 1;
        $scope.carts.push({
            id : id,
            num : nums,
            imageUrl : imageUrl,
            name : name,
            price : price
        });
	};
	$scope.sum = function(){
		var money = 0;
		angular.forEach($scope.carts, function(cart){	
			money += cart.price * cart.num;
		})
		return money;
	};
	$scope.totalNum = function(){
		var money = 0;
		angular.forEach($scope.carts, function(cart){		
			money += cart.num;
		})
		return money;
	};

	$scope.remove = function(index){
		var removeEl = $scope.carts.indexOf(index);
        $scope.carts.splice(removeEl, 1);
	};

	$scope.minus = function(index){
		if($scope.carts[index].num>1){
			$scope.carts[index].num--;
		}
		if($scope.carts[index].num==1) return;
	};
	$scope.plus = function(index){
		$scope.carts[index].num++;
	};
	$scope.form = function(){
		var item = angular.toJson($scope.carts);
		if( $scope.carts.length>0){
			$http.post('main.php', item).then(
			function(success){
				alert('ваша заявка выполнена');
			},
			function(error){
				$scope.error = error.data;
			});
		}else{
			alert('Сделайте заказ');
		}			
	};
}]);
phonecatApp.controller('AboutCtrl',function($scope, $http, $location){

});
phonecatApp.controller('ContactsCtrl',function($scope, $http, $location){
	
});
phonecatApp.controller('PhoneDetailCtrl',function($scope, $http, $location, $routeParams){
	$scope.phoneId = $routeParams.phoneId;
});

