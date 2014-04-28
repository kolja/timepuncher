var timepuncherAPI = angular.module("timepuncherAPI", ["ngResource"]);

service.factory( "card", function ($resource) {
    return $resource(
        'http://127.0.0.1:5984/timepuncher/a444c37b2521fc0f59fdf65b4b000e52', {}, {
            update: {
                method: 'PUT'
            },
            reviews: {
                method: 'GET',
                params: {
                    reviews_only: true
                },
                isArray: true
            }
        }
    );
});


var timepuncher = angular.module('timepuncher', ['ngRoute'])
    .controller('TimepuncherController', function($scope,$routeParams,$http) {
        $scope.params = $routeParams;
        $http.get('http://127.0.0.1:5984/timepuncher/a444c37b2521fc0f59fdf65b4b000e52').success(function(data) {
            $scope.data = data;
            console.log(data);
        });
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

