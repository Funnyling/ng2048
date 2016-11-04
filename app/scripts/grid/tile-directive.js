(function (angular) {
  'use strict';

  angular
    .module('Grid')
    .directive('tile', tileDirective);

  function tileDirective() {
    return {
      restrict: 'A',
      scope: {
        ngModel: '='
      },
      templateUrl: 'scripts/grid/tile.html'
    };
  }
})(angular);

