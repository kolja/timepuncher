
var tp = angular.module('timepuncher', ['ngRoute','ngResource'])

tp.factory('cardLocal', function () {
    var STORAGE_ID = 'timepuncher';

    return {
        get: function () {
            return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
        },
        put: function (cards) {
            localStorage.setItem(STORAGE_ID, JSON.stringify(cards));
        }
    };
});

tp.factory( "cardCouch", function ($resource) {
    return $resource(
        'http://127.0.0.1:5984/timepuncher/a444c37b2521fc0f59fdf65b4b000e52', {}, {
            update: {
                method: 'PUT'
            },
            cards: {
                method: 'GET',
                params: {
                    active_only: true
                },
                isArray: true
            }
        }
    );
});

tp.controller('TimepuncherController', function($scope,$routeParams,$http) {
    $scope.params = $routeParams;
    $http.get('http://127.0.0.1:5984/timepuncher/a444c37b2521fc0f59fdf65b4b000e52').success(function(data) {
        $scope.data = data;
        console.log(data);
    });
});

tp.config( function ($routeProvider) {
    $routeProvider
        .when( '/', {
            controller: 'TimepuncherController',
            templateUrl: 'views/main.html'
        })
        .otherwise( function ($scope) {
            console.log("blork");
        });
});

