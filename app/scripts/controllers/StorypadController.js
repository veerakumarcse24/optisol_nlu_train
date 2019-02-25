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
       
        //vmIntentGrid.onInit();
    }

})();


angular.module('optisolNluTrainerApp').directive('ckEditor', function () {
    return {
        require: '?ngModel',
        link: function (scope, elm, attr, ngModel) {
            var ck = CKEDITOR.replace(elm[0]);
            if (!ngModel) return;
            ck.on('instanceReady', function () {
                ck.setData(ngModel.$viewValue);
            });
            function updateModel() {
                scope.$apply(function () {
                ngModel.$setViewValue(ck.getData());
            });
        }
        ck.on('change', updateModel);
        ck.on('key', updateModel);
        ck.on('dataReady', updateModel);

        ngModel.$render = function (value) {
            ck.setData(ngModel.$viewValue);
        };
    }
};
});