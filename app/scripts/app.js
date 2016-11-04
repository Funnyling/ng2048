(function (angular) {
  'use strict';

  /**
   * @ngdoc overview
   * @name twentyFortyEightApp
   * @description
   * # twentyFortyEightApp
   *
   * Main module of the application.
   */
  angular
    .module('twentyFortyEightApp', [
      'Game',
      'Grid',
      'Keyboard',
      'ngAnimate',
      'ngCookies'
    ])
    .config(twentyFortyEightAppConfig)
    .controller('GameController', GameController);

  twentyFortyEightAppConfig.$injec = ['GridServiceProvider'];

  GameController.$inject = [
    'gameManager',
    'keyboardService'
  ];

  function twentyFortyEightAppConfig(GridServiceProvider) {
    GridServiceProvider.setSize(4);
  }

  function GameController(gameManager, keyboardService) {
    this.game = gameManager;

    this.newGame = function () {
      keyboardService.init();
      this.game.newGame();
      this.startGame();
    };

    this.startGame = function () {
      var self = this;

      keyboardService.on(function (key) {
        self.game.move(key);
      });
    };

    this.newGame();
  }
})(angular);



