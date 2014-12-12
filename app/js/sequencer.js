;(function () {
  "use strict";

  function makeTracks() {
    return {
      CYmbal: { url: '/Cymbal/Cym80815.wav', pattern: {} },
      ClosedHihat: { url: '/ClosedHiHat/CH80833.wav', pattern: {} },
      OpenHihat: { url: '/OpenHiHat/OH80817.wav', pattern: {} },
      HCP: { url: '/Clap/Clap80823.wav', pattern: {} },
      COWbell: { url: '/CowBell/Cowbell80810.wav', pattern: {} },
      HiTom: { url: '/Toms/Tom80844.wav', pattern: {} },
      MidTom: { url: '/Toms/Tom80819.wav', pattern: {} },
      LowTom: { url: '/Toms/Tom8086.wav', pattern: {} },
      SnareDrum: { url: '/SnareDrum/Snare80837.wav', pattern: {} },
      BassDrum: { url: '/BassDrum/Un-Pitched/Kick80810.wav', pattern: {} },
      RimShot: { url: '/RimShot/Rim8088.wav', pattern: {} },
      CLaves: { url: '/Claves/Clave8084.wav', pattern: {} },
    };
  }

  function msToNextStep(bpm) {
    return ((60 / bpm) / 4) * 1000;
  }

  function Sequencer() {
    this.bpm = 128;
    this.setDuration(8);
    this._currentStep = 0;
    this._variations = {
      8: makeTracks(),
      16: makeTracks(),
      32: makeTracks(),
    };

    this.instruments = Object.keys(makeTracks());
  }

  Sequencer.prototype = {
    setDuration: function (duration) {
      this.duration = duration;
      this.steps =  _.range(1, this.duration + 1);
      return this;
    },

    setBpm: function (bpm) {
      this.bpm = parseInt(bpm, 10);
      return this;
    },

    tick: function () {
      this._currentStep += 1;
      return this;
    },

    playStep: function () {
      var self = this;
      _(self._variations).forEach(function (variation, duration) {
        var step = self._currentStep % duration || duration;

        _(variation).forEach(function (track, trackName) {
          if (track[step] !== undefined) {
            track[step].play();
          }
        });
      });
      return this;
    },

    isCurrentStep: function (step) {
      var modDuration = this._currentStep % this.duration;
      if (this._currentStep === 0) {
        return false;
      } else if (modDuration === 0) {
        return this.duration === step;
      } else {
        return modDuration === step;
      }
    },

    toggleStep: function (instrument, step) {
      var track = this._variations[this.duration][instrument];
      if (this.isActiveInstrument(instrument, step)) {
        track[step] = undefined;
      } else {
        track[step] = new Audio(track.url);
      }
      return this;
    },

    isActiveInstrument: function (instrument, step) {
      return this._variations[this.duration][instrument][step] !== undefined;
    },
  };

  window.Sequencer = Sequencer;
}());
