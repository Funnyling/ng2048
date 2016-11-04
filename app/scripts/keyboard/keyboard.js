(function (angular) {
  'use strict';

  angular
    .module('Keyboard', [])
    .service('keyboardService', keyboardService);

  keyboardService.$inject = ['$document'];

  function keyboardService($document) {

    var UP = 'up',
      DOWN = 'down',
      LEFT = 'left',
      RIGHT = 'right';

    var keyMap = {
      37: LEFT,
      38: UP,
      39: DOWN,
      40: RIGHT
    };

    this.init = function () {
      var self = this;
      this.keyEventHandlers = [];
      $document.bind('keydown', function (event) {
        var key = keyMap[event.which];
        if (key) {
          event.preventDefault();
          self._handleKeyEvent(key, event);
        }
      });
    };

    this.on = function (cb) {
      this.keyEventHandlers.push(cb);
    };

    // Helper function to handle keyboard events and process them with custom keyEventhandlers
    this._handleKeyEvent = function (key, event) {
      var callbacks = this.keyEventHandlers;
      if (!callbacks) {
        return;
      }

      event.preventDefault();

      if (callbacks) {
        for (var i = 0, length = callbacks.length; i < length; i++) {
          var cb = callbacks[i];
          cb(key, event);
        }
      }
    };
  }
})(angular);
