
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
        'http://127.0.0.1:5984/timepuncher/_design/cards/_view/all', {}, {
            update: {
                method: 'PUT'
            },
            cards: {
                method: 'GET',
                params: {
                    active_only: true
                }
            }
        }
    );
});

tp.controller('TimepuncherController', function($scope,$routeParams,cardCouch) {
    $scope.params = $routeParams;

    cardCouch.cards().$promise.then(function(data) {
        $scope.data = data.rows[0].value;
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

