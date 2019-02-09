(function() {
    'use strict';

    angular
        .module('optisolNluTrainerApp')
        .controller('IntentGridCtrl', IntentGridCtrl);

    IntentGridCtrl.$inject = ['$scope', '$location', '$filter','$rootScope', '$uibModal', '$cookies', '$http', 'UtilityService', 'filterFilter'];

    function IntentGridCtrl($scope, $location, $filter, $rootScope, $cookies, $uibModal, $http, UtilityService, filterFilter) {
        var vmIntentGrid = this;
        var self = this;
        self.scope = $scope;
        self.rootScope = $rootScope;

        vmIntentGrid.trainData = {};
        vmIntentGrid.dropdwonSourceData = [];
        vmIntentGrid.itemsPerPage = 5;
        vmIntentGrid.currentPage = 1;

        vmIntentGrid.onInit = function()
        {
        	vmIntentGrid.getData();
            vmIntentGrid.selectedIndexVal = null;
        }

        vmIntentGrid.getData = function () {

		   $http({
		      method: 'GET',
		      url: '/static/trainData.json'
		   }).then(function (response){
		   		vmIntentGrid.trainData = response.data;
		   		vmIntentGrid.dropdwonSourceData = angular.copy(vmIntentGrid.trainData.rasa_nlu_data.common_examples);
		   		vmIntentGrid.searchMethod();
		   		vmIntentGrid.paginationMethod();
		   },function (error){
		   		console.log("Error getting trainData");
		   });
		}

		vmIntentGrid.createIntent = function () {
			vmIntentGrid.backIntent = angular.copy(vmIntentGrid.trainData.rasa_nlu_data.common_examples);
            vmIntentGrid.selectedIndexVal = vmIntentGrid.trainData.rasa_nlu_data.common_examples.length;
            var temp = {};
   			temp.entities = [];
            vmIntentGrid.trainData.rasa_nlu_data.common_examples[vmIntentGrid.selectedIndexVal] = temp;
            vmIntentGrid.newIntentIcon = false;
            UtilityService.openPopupWithBackdrop('addIntent.html', $scope);
        }

        vmIntentGrid.addIntent = function (indexVal) {
            vmIntentGrid.selectedIndexVal = indexVal;
            vmIntentGrid.backupEntity = angular.copy(vmIntentGrid.paginizedData[indexVal]);
            vmIntentGrid.newIntentIcon = false;
            UtilityService.openPopupWithBackdrop('addEntity.html', $scope);
        }

        vmIntentGrid.closePopup = function () {
            UtilityService.closePopup();
        }

        vmIntentGrid.revertEntity = function (indexVal) {
            vmIntentGrid.paginizedData[indexVal] = vmIntentGrid.backupEntity;
            UtilityService.closePopup();
        }

        vmIntentGrid.create_closePopup = function () {
            UtilityService.closePopup();
            vmIntentGrid.dropdwonSourceData = angular.copy(vmIntentGrid.trainData.rasa_nlu_data.common_examples);
            vmIntentGrid.searchText = '';
            vmIntentGrid.dropDownIntent = '';
            vmIntentGrid.searchMethod();
        }

        vmIntentGrid.create_revertEntity = function (indexVal) {
            vmIntentGrid.trainData.rasa_nlu_data.common_examples = vmIntentGrid.backIntent;
            UtilityService.closePopup();
        }

        vmIntentGrid.creat_removeEntity = function (intentIndex, entityIndex) {
            if ((entityIndex > -1) && (intentIndex > -1)) {
              vmIntentGrid.trainData.rasa_nlu_data.common_examples[vmIntentGrid.selectedIndexVal].entities.splice(entityIndex, 1);
            }
        }

        vmIntentGrid.addNewEntity = function (indexVal) {
            vmIntentGrid.paginizedData[vmIntentGrid.selectedIndexVal].entities.push({});
        }

        vmIntentGrid.removeEntity = function (intentIndex, entityIndex) {
            if ((entityIndex > -1) && (intentIndex > -1)) {
              vmIntentGrid.paginizedData[vmIntentGrid.selectedIndexVal].entities.splice(entityIndex, 1);
            }
        }


        vmIntentGrid.removeIntent = function (indexVal) {
        	if (indexVal > -1) {
        	  var target_index = ((vmIntentGrid.currentPage * vmIntentGrid.itemsPerPage) - vmIntentGrid.itemsPerPage) + indexVal;
              vmIntentGrid.trainData.rasa_nlu_data.common_examples.splice(target_index, 1);
        	  vmIntentGrid.searchMethod();
            }
        }

        vmIntentGrid.paginationMethod = function()
        {
        	vmIntentGrid.paginizedData = [];
        	var start = (vmIntentGrid.currentPage * vmIntentGrid.itemsPerPage) - vmIntentGrid.itemsPerPage;
        	var destination = (vmIntentGrid.currentPage * vmIntentGrid.itemsPerPage) - 1;
        	destination = (destination > vmIntentGrid.filteredIntents.length) ? (vmIntentGrid.filteredIntents.length - 1) : destination;
        	for(var i = start; i <= destination; i++)
        	{
        		vmIntentGrid.paginizedData.push(vmIntentGrid.filteredIntents[i]);
        	}
        }

        vmIntentGrid.searchMethod = function()
        {
        	vmIntentGrid.filteredIntents = filterFilter(vmIntentGrid.trainData.rasa_nlu_data.common_examples, {text:vmIntentGrid.searchText, intent:vmIntentGrid.dropDownIntent});		
        	vmIntentGrid.currentPage = 1;
        	vmIntentGrid.paginationMethod();
        }

        vmIntentGrid.onInit();
    }

})();

angular.module('optisolNluTrainerApp').filter('unique', function() {
   // we will return a function which will take in a collection
   // and a keyname
   return function(collection, keyname) {
      // we define our output and keys array;
      var output = [], 
          keys = [];
      
      // we utilize angular's foreach function
      // this takes in our original collection and an iterator function
      angular.forEach(collection, function(item) {
          // we check to see whether our object exists
          var key = item[keyname];
          // if it's not already part of our keys array
          if(keys.indexOf(key) === -1) {
              // add it to our keys array
              keys.push(key); 
              // push this item to our final output array
              output.push(item);
          }
      });
      // return our array which should be devoid of
      // any duplicates
      return output;
   };
});