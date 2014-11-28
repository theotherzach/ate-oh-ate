;(function () {
  "use strict";

  function Clock() {
    this._bpm = 60;
  }

  Clock.prototype = {

    getBPM: function () {
      return this._bpm;
    },

    setBPM: function (bpm) {
      if (bpm <= 0) { throw "BPM must be >= 0, was " + bpm; }
      this._bpm = bpm;
      return this;
    },

    run: function (callback) {
      var self = this;

      function tick() {
        callback();
        setTimeout(tick, (60 / self._bpm) * 1000)
      };

      tick();
      return self;
    },

  };

  window.Clock = Clock;
}());
