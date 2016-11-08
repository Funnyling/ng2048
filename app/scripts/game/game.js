(function (angular) {
  'use strict';
  angular
    .module('Game', [
      'Grid',
      'ngCookies'
    ])
    .service('gameManager', gameManager);

  gameManager.$inject = [
    '$q',
    '$timeout',
    'gridService',
    '$cookieStore'
  ];

  function gameManager($q, $timeout, gridService, $cookieStore) {

    this.getHighScore = function () {
      return parseInt($cookieStore.get('highScore')) || 0;
    };

    this.grid = gridService.grid;
    this.tiles = gridService.tiles;
    this.gameSize = gridService.getSize();

    this.winningValue = 2048;

    this.reinit = function () {
      this.gameOver = false;
      this.win = false;
      this.currentScore = 0;
      this.highScore = this.getHighScore();
    };

    this.reinit();

    this.newGame = function () {
      gridService.buildEmptyGameBoard();
      gridService.buildStartingPosition();
      this.reinit();
    };

    /*
     * The game loop
     *
     * Inside here, we'll run every 'interesting'
     * event (interesting events are listed in the Keyboard service)
     * For every event, we'll:
     *  1. look up the appropriate vector
     *  2. find the furthest possible locations for each tile and
     *     the next tile over
     *  3. find any spots that can be 'merged'
     *    a. if we find a spot that can be merged:
     *      i. remove both tiles
     *      ii. add a new tile with the double value
     *    b. if we don't find a merge:
     *      i. move the original tile
     */
    this.move = function (key) {
      var self = this;
      var f = function () {
        if (self.win) {
          return false;
        }

        var positions = gridService.traversalDirections(key);
        var hasMoved = false;
        var hasWon = false;

        // Update Grid
        gridService.prepareTiles();

        positions.x.forEach(function (x) {
          positions.y.forEach(function (y) {
            var originalPosition = {x: x,y: y};
            var tile = gridService.getCellAt(originalPosition);

            if (tile) {
              var cell = gridService.calculateNextPosition(tile, key),
                next = cell.next;

              if (next && next.value === tile.value && !next.merged) {

                // MERGE
                var newValue = tile.value * 2;

                var merged = gridService.newTile(tile, newValue);
                merged.merged = [tile, cell.next];

                gridService.insertTile(merged);
                gridService.removeTile(tile);

                gridService.moveTile(merged, next);

                self.updateScore(self.currentScore + cell.next.value);

                if (merged.value >= self.winningValue) {
                  hasWon = true;
                }
                hasMoved = true; // we moved with a merge
              } else {
                gridService.moveTile(tile, cell.newPosition);
              }

              if (!gridService.samePositions(originalPosition,cell.newPosition)) {
                hasMoved = true;
              }
            }
          });
        });

        if (hasWon && !self.win) {
          self.win = true;
        }

        if (hasMoved) {
          gridService.randomlyInsertNewTile();

          if (self.win || !self.movesAvailable()) {
            self.gameOver = true;
          }
        }

      };
      return $q.when(f());
    };

    this.movesAvailable = function () {
      return gridService.anyCellsAvailable() || gridService.tileMatchesAvailable();
    };

    this.updateScore = function (newScore) {
      this.currentScore = newScore;
      if (this.currentScore > this.getHighScore()) {
        this.highScore = newScore;
        $cookieStore.put('highScore', newScore);
      }
    };

  }
})(angular);

