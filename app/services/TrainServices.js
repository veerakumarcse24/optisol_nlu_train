(function () {
    'use strict';

    angular
        .module('optisolNluTrainerApp')
        .factory('TrainServices', TrainServices);

    TrainServices.$inject = ['$http', '$cookies', '$rootScope', '$timeout'];
    function TrainServices($http, $cookies, $rootScope, $timeout) {
        var vmTrainService = {};
        
        vmTrainService.rasa_train = function (dataObj, url, callback) {
          $http.post(url, dataObj)
             .then(function (response) {
                 callback(response);
             },
             function (response) {
                 callback(response);
            });
        };

        vmTrainService.uploadServerStory = function (callback) {
          $http.post('http://localhost:9143/get_stories')
             .then(function (response) {
                 callback(response);
             },
             function (response) {
                 callback(response);
            });
        };

        vmTrainService.uploadServerDomainFile = function (callback) {
          $http.post('http://localhost:9143/get_domain_yml')
             .then(function (response) {
                 callback(response);
             },
             function (response) {
                 callback(response);
            });
        };

        vmTrainService.story_train = function (dataObj, callback) {
            $http({
                method: 'POST',
                url: 'http://localhost:9143/save_story_data',
                data: dataObj,
                headers: {
                    'Content-Type': 'application/json'
                }}).then(function (response) {
                 callback(response);
                 },
                 function (response) {
                     callback(response);
                });
        };

        return vmTrainService;
    };

})();