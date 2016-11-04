(function (angular) {
  'use strict';

  angular
    .module('Grid')
    .directive('grid', gridDirective);

  function gridDirective() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        ngModel: '='
      },
      templateUrl: 'scripts/grid/grid.html'
    };
  }

})(angular);
