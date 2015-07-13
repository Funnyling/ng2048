'use strict';

/**
 * @ngdoc overview
 * @name twentyfourtyeightApp
 * @description
 * # twentyfourtyeightApp
 *
 * Main module of the application.
 */
angular
  .module('twentyfourtyeightApp', [
    'ngCookies',
    'Game'
  ])
  .controller('GameController', function (GameManager) {
    this.game = GameManager;
  });
