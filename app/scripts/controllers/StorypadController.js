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

        vmStorypad.saveConfigFile = function() {
          // var json = vmIntentGrid.trainData;
          // var jsonse = JSON.stringify(json);
          var blob = new Blob([vmStorypad.domainFile], {
            type: "application/text"
          });
          $scope.filename = $scope.filename || "my_domain";
          saveAs(blob, $scope.filename + ".yml");
        }

        vmStorypad.trainStory = function() {
            if(!vmStorypad.storiesFile || !vmStorypad.domainFile)
            {
                var message = 'Please check stories and domain files.';
                Flash.create('info', message);
                return false;
            }
            var dataObj = {
                'storyFile': vmStorypad.storiesFile,
                'domainFile': vmStorypad.domainFile
            };
            vmStorypad.pageLoader = true;
            TrainServices.story_train(dataObj, function (response) {
                var res = response.data;
                vmStorypad.pageLoader = false;
                if (res.Status == 'success') {
                    var message = res.data;
                    Flash.create('success', message);
                } else {
                    var message = 'Some thing went wrong';
                    Flash.create('danger', message);
                }
            });
        }
       
        vmStorypad.onInit();
    }

})();