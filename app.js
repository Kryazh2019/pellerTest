'use strict';

let myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../app/pages/main.html',
            controller: 'mainController'
        })
        .when('/clubs', {
            templateUrl: '../app/pages/clubs.html',
            controller: 'clubsController'
        })
        .when('/clubs/:id', {
            templateUrl: '../app/pages/events.html',
            controller: 'eventsController'
        })
        .when('/eventTest', {
            templateUrl:'../app/pages/eventTest.html',
            controller: 'eventsCtrl'
        })
});

myApp.controller('mainController', function ($scope) {
    $scope.name = 'Main controller';
});
myApp.controller('clubsController', function ($scope, $http) {

    $scope.refresh = function() {
        $http.get('../app/data/clubs.json').success(function (data) {
            $scope.clubs = data;
        });
    }
    $scope.refresh();

});
myApp.controller('eventsController', function ($scope, $http, $routeParams, $q) {
    $scope.refresh = function() {
        $http.get('../app/data/events.json').success(function (data) {
            $scope.events = data;

            let arrEv = $scope.events;
            let arr = arrEv.filter(function(elem) {
                return elem.clubid == $routeParams.id;
            });

            $scope.arrEvents = arr;
            return $scope.arrEvents;
        })
    }
    $scope.refresh();

    $scope.showTickets = function(idEvent) {
        $http.get('../app/data/tickets.json').success(function (data) {
            $scope.tickets = data;

            let arrT = $scope.tickets;


            let arr = arrT.filter(function(elem) {
                return elem.event == idEvent;
            });
            $scope.arrTickets = arr;
            console.log($scope.arrTickets);

        })
    }
})



































