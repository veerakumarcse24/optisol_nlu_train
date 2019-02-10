(function() {
    'use strict';

    angular
        .module('optisolNluTrainerApp')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$location', '$filter','$rootScope', '$uibModal', '$cookies', '$http', 'UtilityService', 'filterFilter', 'Flash', 'MyService'];

    function MainCtrl($scope, $location, $filter, $rootScope, $cookies, $uibModal, $http, UtilityService, filterFilter, Flash, MyService) {
        var vmMain = this;
        var self = this;
        self.scope = $scope;
        self.rootScope = $rootScope;
         

        vmMain.getTheFiles = function($files)
        {
        	var reader = new FileReader();
	        reader.onload = vmMain.onReaderLoad;
	        reader.readAsText($files[0]);
        }

        vmMain.onReaderLoad = function onReaderLoad(event){

	        var keyData = event.target.result;
	        var output = document.getElementById('key_file_data');
      		output.value = keyData;
	        //console.log(keyData);
	    }

	    vmMain.validateKeyFile = function()
	    {

	    	var keyData = document.getElementById('key_file_data').value;
	    	if(keyData)
	    	{
	    		vmMain.keyFileData = keyData;
	    		MyService.update(vmMain.keyFileData);
	    		var message = '<b>Key file accepted.</b>';
        		Flash.create('success', message);
	    	}else{
	    		vmMain.keyFileData = null;
	    		var message = '<b>Invalid key file.</b>';
        		Flash.create('danger', message);
	    	}
	    }
    }

})();

 angular.module('optisolNluTrainerApp').factory('MyService', function(){
  return {
    data: null,
    update: function(keyFileData) {
      this.data = keyFileData;
    }
  };
});

 angular.module('optisolNluTrainerApp').directive('ngFiles', ['$parse', function ($parse) {

            function fn_link(scope, element, attrs) {
                var onChange = $parse(attrs.ngFiles);
                element.on('change', function (event) {
                    onChange(scope, { $files: event.target.files });
                });
            };

            return {
                link: fn_link
            }
        } ]);