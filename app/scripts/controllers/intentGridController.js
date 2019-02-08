(function() {
    'use strict';

    angular
        .module('optisolNluTrainerApp')
        .controller('IntentGridCtrl', IntentGridCtrl);

    IntentGridCtrl.$inject = ['$scope', '$location', '$filter','$rootScope', '$uibModal', '$cookies', '$http', 'UtilityService'];

    function IntentGridCtrl($scope, $location, $filter, $rootScope, $cookies, $uibModal, $http, UtilityService) {
        var vmIntentGrid = this;
        var self = this;
        self.scope = $scope;
        self.rootScope = $rootScope;

        vmIntentGrid.trainData = {};

        vmIntentGrid.onInit = function()
        {
        	vmIntentGrid.IntentGridData = ['apple','orange','banana'];
        	vmIntentGrid.getData();
            vmIntentGrid.selectedIndexVal = null;
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

        vmIntentGrid.addEntity = function (indexVal) {
            vmIntentGrid.selectedIndexVal = indexVal;
            vmIntentGrid.backupEntity = angular.copy(vmIntentGrid.trainData.rasa_nlu_data.common_examples[indexVal].entities);
            UtilityService.openPopupWithBackdrop('addEntity.html', $scope);
        }

        vmIntentGrid.closePopup = function () {
            UtilityService.closePopup();
        }

        vmIntentGrid.revertEntity = function (indexVal) {
            vmIntentGrid.trainData.rasa_nlu_data.common_examples[indexVal].entities = vmIntentGrid.backupEntity;
            UtilityService.closePopup();
        }

        vmIntentGrid.addNewEntity = function (indexVal) {
            vmIntentGrid.trainData.rasa_nlu_data.common_examples[vmIntentGrid.selectedIndexVal].entities.push({});
        }

        vmIntentGrid.removeEntity = function (intentIndex, entityIndex) {
            if ((entityIndex > -1) && (intentIndex > -1)) {
              vmIntentGrid.trainData.rasa_nlu_data.common_examples[vmIntentGrid.selectedIndexVal].entities.splice(entityIndex, 1);
            }
        }

        vmIntentGrid.onInit();
    }

})();