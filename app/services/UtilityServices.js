angular.module('optisolNluTrainerApp').factory('UtilityService',[ '$uibModal','$rootScope','$document',
function ($uibModal,$rootScope,$document){
  return {
    //scroll to a position
    scrollTo:function(element){
      var top = 400;
      var duration = 2000; //milliseconds

      //Scroll to the exact position
      // $document.scrollTop(top, duration).then(function() {
      //   console && console.log('You just scrolled to the top!');
      // });

      var offset = 30; //pixels; adjust for floating menu, context etc
      //Scroll to #some-id with 30 px "padding"
      //Note: Use this in a directive, not with document.querySelector
      var someElement = angular.element(document.querySelector(element));
      $document.scrollToElement(someElement, offset, duration);
    },
    //open modal popup
    openPopup: function (html, scope) {
      $uibModal.open({
        templateUrl: html,
        scope: scope,
        controller: 'ModalInstanceCtrl as vmModal'
      }).result.then(function(){

      }, function(res){

      });
    },
    openPopupWithBackdrop: function (html, scope) {
      $uibModal.open({
          templateUrl: html,
          scope: scope,
          controller: 'ModalInstanceCtrl as vmModal',
          backdrop: 'static',
          keyboard: false,
      }).result.then(function(){

      }, function(res){

      });
    },
    closePopup: function () {
      $rootScope.$broadcast('dismissPopup');
    },
    dateRange: function (startDate, endDate) {
      var start      = startDate.split('-');
      var end        = endDate.split('-');
      var startYear  = parseInt(start[0]);
      var endYear    = parseInt(end[0]);
      var dates      = [];

      for(var i = startYear; i <= endYear; i++) {
        var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
        var startMon = i === startYear ? parseInt(start[1])-1 : 0;
        for(var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j+1) {
          var month = j+1;
          var displayMonth = month < 10 ? '0'+month : month;
          dates.push([i, displayMonth, '01'].join('-'));
        }
      }
      return dates;
    }
  }
}
]);

(function () {
  angular
  .module('optisolNluTrainerApp')
  .controller('ModalInstanceCtrl', ModalInstanceCtrl);
  ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance'];
  function ModalInstanceCtrl($scope, $uibModalInstance) {
    var vmModal = this;

    vmModal.dismissPopup = function () {
      $uibModalInstance.dismiss();
    };
    $scope.$on('dismissPopup', function () {
      vmModal.dismissPopup();
    });
  }
})();
