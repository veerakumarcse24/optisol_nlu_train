(function() {
    'use strict';

    angular
        .module('optisolNluTrainerApp')
        .controller('IntentGridCtrl', IntentGridCtrl);

    IntentGridCtrl.$inject = ['$scope', '$location', '$filter','$rootScope', '$cookies', '$http'];

    function IntentGridCtrl($scope, $location, $filter, $rootScope, $cookies, $http) {
        var vmIntentGrid = this;
        var self = this;
        self.scope = $scope;
        self.rootScope = $rootScope;

        vmIntentGrid.trainData = {};

        vmIntentGrid.onInit = function()
        {
        	vmIntentGrid.IntentGridData = ['apple','orange','banana'];
        	vmIntentGrid.getData();
        }

        vmIntentGrid.getData = function () {

		   $http({
		      method: 'GET',
		      url: '/static/trainData.json'
		   }).then(function (response){
		   		vmIntentGrid.trainData = response.data;
		   },function (error){
		   		console.log("Error getting trainData");
		   });
		}

        vmIntentGrid.onInit();
    }

})();