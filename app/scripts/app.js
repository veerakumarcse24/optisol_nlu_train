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
    'ui.bootstrap',
    'ngFlash',
    'onSelect',
    'ng.ckeditor'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vmMain'
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
      .when('/story_pad', {
        templateUrl: 'views/storyPad.html',
        controller: 'StorypadCtrl',
        controllerAs: 'vmStorypad'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
