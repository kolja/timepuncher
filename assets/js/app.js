
var tp = angular.module('timepuncher', ['ngRoute','ngResource'])

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

tp.directive('card', function() {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: 'partials/card.html',
        link: function (scope,element,attributes) {
            scope.card = scope.card.value;
        }
    };
});
tp.directive('cards', function($templateCache) {
    return {
        transclude: 'false',
        restrict: 'E',
        link: function(scope, element, attrs, ctrl, transclude) {
            var template = $templateCache.get('cardTemplate');
            var templateElement = angular.element(template);
            transclude(scope, function(clone) {
                element.after(templateElement.append(clone));
            });
        }
    };
});

tp.filter('timeFormatter', function() {
    return function(time) {
        timeString = time[0] + "h : " + time[1] + "min " + time[2] + "sec"
        return timeString;
    };
});

tp.controller('TimepuncherController', function($scope,$routeParams,cardCouch) {

    $scope.params = $routeParams;

    cardCouch.cards().$promise.then(function(data) {
        $scope.cards = data.rows;
    });
});

tp.config( function ($routeProvider) {
    $routeProvider
        .when( '/', {
            controller: 'TimepuncherController',
            templateUrl: 'views/cards.html'
        })
        .when( '/signup', {
            controller: 'TimepuncherController',
            templateUrl: 'views/signup.html'
        })
        .otherwise( function ($scope) {
            console.log("blork");
        });
});

