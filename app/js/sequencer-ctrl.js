;(function () {
  "use strict";

  angular.module("app").controller("sequencerCtrl", function ($scope, $timeout) {

    function init() {
      $scope.setDuration($scope.duration);
      $scope.toggleStep('ClosedHihat', 3);
      $scope.toggleStep('ClosedHihat', 7);
      $scope.toggleStep('SnareDrum', 5);
      $scope.toggleStep('BassDrum', 1);
      $scope.toggleStep('BassDrum', 5);
    }

    function msToNextStep(bpm) {
      return ((60 / bpm) / 4) * 1000;
    }

    function tick() {
      return $timeout(function () {
        currentStep += 1;

        variations.forEach(function (variation) {
          var step = currentStep % variation.duration || variation.duration;

          _(variation.tracks).forEach(function (track) {
            if (track.pattern[step] !== undefined) {
              track.pattern[step].play();
            }
          });

        });
        tickId = tick();
      }, msToNextStep($scope.bpm));
    }

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

    // ======== STATE ========
    var currentStep = 0;
    var tickId = null;
    var variations = [{
      tracks: makeTracks(),
      duration: 8,
    }, {
      tracks: makeTracks(),
      duration: 16,
    }, {
      tracks: makeTracks(),
      duration: 32,
    }];

    $scope.bpm = 128;
    $scope.duration = 8;
    $scope.steps = [];
    // =======================

    $scope.instruments = Object.keys(makeTracks());
    $scope.isRunning = function () {
      return tickId !== null;
    };

    $scope.setBpm = function (bpm) {
      $scope.bpm = parseInt(bpm, 10);
    };

    $scope.setDuration = function () {
      $scope.steps =  _.range(1, $scope.duration + 1);
    };

    $scope.toggleStep = function (instrument, step) {
      var track = _(variations).
        findWhere({ duration: $scope.duration }).
        tracks[instrument];

      if (track.pattern[step] === undefined) {
        track.pattern[step] = new Audio(track.url);
      } else {
        track.pattern[step] = undefined;
      }
    };

    $scope.note = function (instrument, step) {
      var track = _(variations).
        findWhere({ duration: $scope.duration }).
        tracks[instrument];

      if (track.pattern[step] === undefined) {
        return "";
      } else {
        return "o";
      }
    };

    $scope.toggleSequence = function () {
      if ($scope.isRunning()) {
        $timeout.cancel(tickId);
        currentStep = 0;
        tickId = null;
      } else {
        tickId = tick();
      }
    };

    $scope.isCurrentStep = function (step) {
      if (currentStep === 0) {
        return false;
      } else {
        return (currentStep % $scope.duration || $scope.duration) === step;
      }
    };

    init();
  });
}());
