angular
  .module('Grdi', [
  ])
  .directive('grid', function () {

    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        ngModel: '='
      },
      templateUrl: 'scripts/grid/grid.html'
    };

  });
