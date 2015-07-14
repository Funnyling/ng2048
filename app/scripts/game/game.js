'use strict';
angular
  .module('Game', [
  ])
  .service('GameManager', function(GridService) {

    this.newGame = function () {
      GridService.buildEmptyGameBoard();
      GridService.buildStartingPosition();
      this.reinit();
    };

    this.move = function () {};

    //this.updateScore = function (newScore) {};

    this.movesAvaliable = function () {
      return GridService.anyCellAvaliable() || GridService.tileMatchesAvaliable();
    };

    // Reset game state
    this.reinit = function() {
      this.gameOver = false;
      this.win = false;
      this.currentScore = 0;
      this.highScore = 0; // we'll come back to this
    };
  });
