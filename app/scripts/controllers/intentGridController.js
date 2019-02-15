(function() {
    'use strict';

    angular
        .module('optisolNluTrainerApp')
        .controller('IntentGridCtrl', IntentGridCtrl);

    IntentGridCtrl.$inject = ['$scope', '$location', '$filter','$rootScope', '$uibModal', '$cookies', '$http', 'UtilityService', 'filterFilter', 'Flash', 'MyService', 'TrainServices'];

    function IntentGridCtrl($scope, $location, $filter, $rootScope, $cookies, $uibModal, $http, UtilityService, filterFilter, Flash, MyService, TrainServices) {
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
          vmIntentGrid.selectedIndexVal = null;
          vmIntentGrid.pageLoader = false;
          if(!MyService.data)
          {
            $location.path('/');
          }else{
            vmIntentGrid.trainData = JSON.parse(MyService.data);
            vmIntentGrid.dropdwonSourceData = angular.copy(vmIntentGrid.trainData.data.rasa_nlu_data.common_examples);
            vmIntentGrid.searchMethod();
            vmIntentGrid.paginationMethod();
          }
        }

        /*vmIntentGrid.getData = function () {

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
    		}*/

		vmIntentGrid.createIntent = function () {
			vmIntentGrid.backIntent = angular.copy(vmIntentGrid.trainData.data.rasa_nlu_data.common_examples);
            vmIntentGrid.selectedIndexVal = vmIntentGrid.trainData.data.rasa_nlu_data.common_examples.length;
            var temp = {};
   			temp.entities = [];
            vmIntentGrid.trainData.data.rasa_nlu_data.common_examples[vmIntentGrid.selectedIndexVal] = temp;
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
            vmIntentGrid.dropdwonSourceData = angular.copy(vmIntentGrid.trainData.data.rasa_nlu_data.common_examples);
            UtilityService.closePopup();
        }

        vmIntentGrid.revertEntity = function (indexVal) {
            vmIntentGrid.paginizedData[indexVal] = vmIntentGrid.backupEntity;
            UtilityService.closePopup();
        }

        vmIntentGrid.create_closePopup = function () {
            UtilityService.closePopup();
            vmIntentGrid.dropdwonSourceData = angular.copy(vmIntentGrid.trainData.data.rasa_nlu_data.common_examples);
            vmIntentGrid.searchText = '';
            vmIntentGrid.dropDownIntent = '';
            vmIntentGrid.searchMethod();
        }

        vmIntentGrid.create_revertEntity = function (indexVal) {
            vmIntentGrid.trainData.data.rasa_nlu_data.common_examples = vmIntentGrid.backIntent;
            UtilityService.closePopup();
        }

        vmIntentGrid.creat_removeEntity = function (intentIndex, entityIndex) {
            if ((entityIndex > -1) && (intentIndex > -1)) {
              vmIntentGrid.trainData.data.rasa_nlu_data.common_examples[vmIntentGrid.selectedIndexVal].entities.splice(entityIndex, 1);
            }
        }

        vmIntentGrid.handler = function(selection, indexVal) {
          if(selection.text)
          {
            var is_new = true;
            angular.forEach(vmIntentGrid.paginizedData[indexVal].entities, function(value, key) {
              if(value.value == selection.text)
              {
                is_new = false;
              }
            });
            if(is_new)
            {
              vmIntentGrid.addNewIntentandEntity(indexVal, selection);
            }
          }
        };

        vmIntentGrid.newHandler = function(selection, indexVal) {
          if(selection.text)
          {
            var is_new = true;
            angular.forEach(vmIntentGrid.trainData.data.rasa_nlu_data.common_examples[indexVal].entities, function(value, key) {
              if(value.value == selection.text)
              {
                is_new = false;
              }
            });
            if(is_new)
            {
              console.log(selection);
              vmIntentGrid.addNewIntentandEntity(indexVal, selection);
            }
          }
        };

        vmIntentGrid.addNewIntentandEntity = function (indexVal, selection) {
            var tempJson = {};
            tempJson.value = selection.text;
            tempJson.start = selection.range.startOffset;
            tempJson.end = selection.range.endOffset;
            $scope.$apply(vmIntentGrid.trainData.data.rasa_nlu_data.common_examples[vmIntentGrid.selectedIndexVal].entities.push(tempJson));
        }

        vmIntentGrid.addNewEntity = function (indexVal, selection) {
            var tempJson = {};
            tempJson.value = selection.text;
            tempJson.start = selection.range.startOffset;
            tempJson.end = selection.range.endOffset;
            vmIntentGrid.paginizedData[indexVal].entities.push(tempJson);
        }

        vmIntentGrid.removeEntity = function (intentIndex, entityIndex) {
            if ((entityIndex > -1) && (intentIndex > -1)) {
              vmIntentGrid.paginizedData[vmIntentGrid.selectedIndexVal].entities.splice(entityIndex, 1);
            }
        }


        vmIntentGrid.removeIntent = function (text) {
          var index_id = -1;
          angular.forEach(vmIntentGrid.trainData.data.rasa_nlu_data.common_examples, function(value, key) {
            if(value.text == text)
            {
              index_id = key;
            }
          });
        	if (index_id > -1) {
        	  var target_index = index_id;
              vmIntentGrid.trainData.data.rasa_nlu_data.common_examples.splice(target_index, 1);
        	  vmIntentGrid.searchMethod();
          }
        }

        vmIntentGrid.paginationMethod = function()
        {
        	vmIntentGrid.paginizedData = [];
        	var start = (vmIntentGrid.currentPage * vmIntentGrid.itemsPerPage) - vmIntentGrid.itemsPerPage;
        	var destination = (vmIntentGrid.currentPage * vmIntentGrid.itemsPerPage) - 1;
        	destination = (destination > (vmIntentGrid.filteredIntents.length - 1)) ? (vmIntentGrid.filteredIntents.length - 1) : destination;
        	for(var i = start; i <= destination; i++)
        	{
        		vmIntentGrid.paginizedData.push(vmIntentGrid.filteredIntents[i]);
        	}
        }

        vmIntentGrid.searchMethod = function()
        {
        	vmIntentGrid.filteredIntents = filterFilter(vmIntentGrid.trainData.data.rasa_nlu_data.common_examples, {text:vmIntentGrid.searchText, intent:vmIntentGrid.dropDownIntent});		
        	vmIntentGrid.currentPage = 1;
        	vmIntentGrid.paginationMethod();
        }

	    vmIntentGrid.saveJSON = function() {
	      var json = vmIntentGrid.trainData;
	      var jsonse = JSON.stringify(json);
	      var blob = new Blob([jsonse], {
	        type: "application/json"
	      });
	      $scope.filename = $scope.filename || "my_json";
	      saveAs(blob, $scope.filename + ".json");
	    }

      vmIntentGrid.saveBack = function() {
        MyService.update(vmIntentGrid.trainData);
        $location.path('/');
      }

      vmIntentGrid.trainModel = function() {
        UtilityService.openPopupWithBackdrop('trainModel.html', $scope);
      }

      vmIntentGrid.startTraing = function(){
        vmIntentGrid.closePopup();
        vmIntentGrid.pageLoader = true;
        TrainServices.rasa_train(vmIntentGrid.trainData, vmIntentGrid.rasa_url, function (response) {
            var res = response.data;
            vmIntentGrid.pageLoader = false;
            if (res.info) {
                var message = res.info;
                Flash.create('success', message);
            } else {
                var message = 'Some thing went wrong';
                Flash.create('danger', message);
            }
        });
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