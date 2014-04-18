
$ = require('jquery');
_ = require('underscore');
angular = require('angular');

angular.module('timepuncher', [])
    .controller('punch', ['$scope', function ($scope) {
        console.log('hi there 2');
        $scope.greetMe = 'World';
    }]);
