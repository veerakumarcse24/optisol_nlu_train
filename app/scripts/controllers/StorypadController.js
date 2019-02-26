(function() {
    'use strict';

    angular
        .module('optisolNluTrainerApp')
        .controller('StorypadCtrl', StorypadCtrl);

    StorypadCtrl.$inject = ['$scope', '$location', '$filter','$rootScope', '$uibModal', '$cookies', '$http', 'UtilityService', 'filterFilter', 'Flash', 'MyService', 'TrainServices'];

    function StorypadCtrl($scope, $location, $filter, $rootScope, $cookies, $uibModal, $http, UtilityService, filterFilter, Flash, MyService, TrainServices) {
        var vmStorypad = this;
        var self = this;
        self.scope = $scope;
        self.rootScope = $rootScope;

        vmStorypad.onInit = function()
        {
            vmStorypad.tab = 1;
        }

        vmStorypad.storyTabChange = function(tab)
        {
            vmStorypad.tab = tab;
        }

        vmStorypad.onFullScreenCallback = function(e) {
            e.showPreview();
        }

        vmStorypad.fullScreenPreview = function() {
            $rootScope.markdownEditorObjects.editor1.showPreview();
            $rootScope.markdownEditorObjects.editor1.setFullscreen(true);
        }

        vmStorypad.saveStoryFile = function() {
          // var json = vmIntentGrid.trainData;
          // var jsonse = JSON.stringify(json);
          var blob = new Blob([vmStorypad.storiesFile], {
            type: "application/text"
          });
          $scope.filename = $scope.filename || "my_stories";
          saveAs(blob, $scope.filename + ".md");
        }

        vmStorypad.saveConfigFile = function() {
          // var json = vmIntentGrid.trainData;
          // var jsonse = JSON.stringify(json);
          var blob = new Blob([vmStorypad.configFile], {
            type: "application/text"
          });
          $scope.filename = $scope.filename || "my_stories";
          saveAs(blob, $scope.filename + ".md");
        }
       
        vmStorypad.onInit();
    }

})();