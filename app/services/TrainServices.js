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

        return vmTrainService;
    };

})();