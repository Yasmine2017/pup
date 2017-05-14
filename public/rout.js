

var app=angular.module("myapp",['ngRoute'])

 .config(['$routeprovider',function($routeprovider){
  $routeprovider
  .when("/omr ali",{
templateUrl:"public/omr ali.html",
//controller:"omrcont"
  });
   $routeprovider.when("/ali ali",{
templateUrl:"public/ali ali.html",
//controller:"alicont"
  });
}]);
/*.controller("omrcont",function($scope,$http){
  $http.get('/doctors').then(function (response) {
               $scope.doctors = response.data;
           })
})*/