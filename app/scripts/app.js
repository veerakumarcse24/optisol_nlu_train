'use strict';

/**
 * @ngdoc overview
 * @name optisolNluTrainerApp
 * @description
 * # optisolNluTrainerApp
 *
 * Main module of the application.
 */
angular
  .module('optisolNluTrainerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/intent_grid', {
        templateUrl: 'views/intentGrid.html',
        controller: 'IntentGridCtrl',
        controllerAs: 'vmIntentGrid'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
