angular
  .module('Grdi', [
  ])
  .directive('tile', function () {

    return {
      restrict: 'A',
      scope: {
        ngModel: '='
      },
      templateUrl: 'scripts/grid/tile.html'
    };

  });
