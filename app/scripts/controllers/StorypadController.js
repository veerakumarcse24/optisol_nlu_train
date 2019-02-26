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

        vmStorypad.uploadStoryFile = function($files, tab) {
          var reader = new FileReader();
          if(tab === 'story')
          {
            reader.onload = vmStorypad.onReaderLoad_story;
          }else if(tab === 'domain')
          {
            reader.onload = vmStorypad.onReaderLoad_domain;
          }else if(tab === 'reply')
          {
            reader.onload = vmStorypad.onReaderLoad_reply;
          }
          reader.readAsText($files[0]);
        }

        vmStorypad.onReaderLoad_story = function onReaderLoad(event){

            var keyData = event.target.result;
            var output = document.getElementById('story_pad');
            output.value = keyData;
        }

        vmStorypad.onReaderLoad_domain = function onReaderLoad(event){

            var keyData = event.target.result;
            var output = document.getElementById('domain_pad');
            output.value = keyData;
        }

        vmStorypad.onReaderLoad_reply = function onReaderLoad(event){

            var keyData = event.target.result;
            var output = document.getElementById('reply_pad');
            output.value = keyData;
        }

        vmStorypad.saveConfigFile = function() {
          // var json = vmIntentGrid.trainData;
          // var jsonse = JSON.stringify(json);
          var blob = new Blob([vmStorypad.domainFile], {
            type: "application/text"
          });
          $scope.filename = $scope.filename || "my_domain";
          saveAs(blob, $scope.filename + ".yml");
        }

        vmStorypad.saveReplyFile = function() {
          // var json = vmIntentGrid.trainData;
          // var jsonse = JSON.stringify(json);
          var blob = new Blob([vmStorypad.replyFile], {
            type: "application/text"
          });
          $scope.filename = $scope.filename || "my_reply";
          saveAs(blob, $scope.filename + ".md");
        }
       
        vmStorypad.onInit();
    }

})();