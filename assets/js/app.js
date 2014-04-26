
var timepuncher = angular.module('timepuncher', ['ngRoute'])

    .controller('TimepuncherController', function($scope,$routeParams) {
        $scope.params = $routeParams;
        $scope.data = {message: "blork"};
    })

    .config( function ($routeProvider) {
        $routeProvider
            .when( '/', {
                controller: 'TimepuncherController',
                templateUrl: 'views/main.html'
            })
            .otherwise( function ($scope) {
                console.log("blork");
            });
    });

