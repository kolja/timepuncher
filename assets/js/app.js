
var timepuncher = angular.module('timepuncher', ['ngRoute'])

    .controller('TimepuncherController', function($scope,$routeParams) {
        $scope.params = $routeParams;
        $scope.data = {message: "Hello"};
        console.log($scope);
        console.log($routeParams);
    })

    .config( function ($routeProvider) {
        console.log("config");
        $routeProvider
            .when( '/', {
                controller: 'TimepuncherController',
                templateUrl: 'partials/card.html'
            })
            .otherwise( function ($scope) {
                console.log("blork");
            });
    });

