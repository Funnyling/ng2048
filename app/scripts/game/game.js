angular
  .module('Game', [
  ])
  .service('GameManager', function() {

    this.newGame = function () {};

    this.move = function () {};

    this.updateScore = function (newScore) {};

    this.movesAvaliable = function () {
      return GridService.anyCellAvaliable() || GridService.tileMatchesAvaliable();
    };
  });
