/*
 * ANGULAR APPLICATION.JS
 */

'use strict';

var app = angular.module('myApp', ['ngResource',
                                   'ngRoute',
                                   'myApp.services',
                                   'myApp.controllers'
                                   ]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/partials/questions-index.html',
        controller: 'questionsIndexController'
      })
      .when('/login', {
        templateUrl: '/partials/login.html',
        controller: 'loginController'
      })
      .when('/logout', {
        controller: 'logoutController'
      })
      .when('/sign-up', {
        templateUrl: '/partials/sign-up.html',
        controller: 'registerController'
      })
      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
  }]);
