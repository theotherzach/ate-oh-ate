;(function () {
  "use strict";

  angular.module("app").controller("sequencerCtrl", function ($scope, $timeout) {

    function makeTracks() {
      return {
        CYmbal: { url: '/Cymbal/Cym80815.wav', pattern: {} },
        HCP: { url: '/Clap/Clap80823.wav', pattern: {} },
        COWbell: { url: '/CowBell/Cowbell80810.wav', pattern: {} },
        HiTom: { url: '/Toms/Tom80844.wav', pattern: {} },
        MidTom: { url: '/Toms/Tom80819.wav', pattern: {} },
        LowTom: { url: '/Toms/Tom8086.wav', pattern: {} },
        RimShot: { url: '/RimShot/Rim8088.wav', pattern: {} },
        CLaves: { url: '/Claves/Clave8084.wav', pattern: {} },
        ClosedHihat: { url: '/ClosedHiHat/CH80833.wav', pattern: {} },
        OpenHihat: { url: '/OpenHiHat/OH80817.wav', pattern: {} },
        SnareDrum: { url: '/SnareDrum/Snare80837.wav', pattern: {} },
        BassDrum: { url: '/BassDrum/Un-Pitched/Kick80810.wav', pattern: {} },
      };
    }

    // ======== STATE ========

    $scope.variations = [{
      tracks: makeTracks(),
      duration: 16,
    }, {
      tracks: makeTracks(),
      duration: 8,
    }, {
      tracks: makeTracks(),
      duration: 32,
    }];

    var tickId = null;

    $scope.currentStep = 0;

    $scope.bpm = 128;

    $scope.duration = 8;

    $scope.steps = [];

    // =======================

    $scope.instruments = Object.keys(makeTracks());

    function msToNextStep(bpm) {
      return ((60 / bpm) / 4) * 1000;
    }

    function tick() {
      return $timeout(function () {
        $scope.currentStep += 1;

        $scope.variations.forEach(function (variation) {
          var step = $scope.currentStep % variation.duration || variation.duration;
          _(variation.tracks).forEach(function (track) {
            if (track.pattern[step] !== undefined) {
              track.pattern[step].play();
            }
          });
        });

        tickId = tick();
      }, msToNextStep($scope.bpm));
    }

    $scope.isRunning = function () {
      return tickId !== null;
    };

    $scope.setBpm = function(bpm) {
      $scope.bpm = parseInt(bpm, 10);
    };

    $scope.setDuration = function(duration) {
      $scope.duration = parseInt(duration, 10);
      $scope.steps =  _.range(1, parseInt(duration, 10) + 1);
    };

    $scope.toggleStep = function (instrument, step) {
      var track = _($scope.variations).findWhere({ duration: $scope.duration }).tracks[instrument];

      if (track.pattern[step] === undefined) {
        track.pattern[step] = new Audio(track.url);
      } else {
        track.pattern[step] = undefined;
      }
    };

    $scope.note = function (instrument, step) {
      var track = _($scope.variations).findWhere({ duration: $scope.duration }).tracks[instrument];

      if (track.pattern[step] === undefined) {
        return "";
      } else {
        return "o";
      }
    };

    $scope.toggleSequence = function () {
      if ($scope.isRunning()) {
        $timeout.cancel(tickId);
        $scope.currentStep = 0;
        tickId = null;
      } else {
        tickId = tick();
      }
    };

    $scope.isCurrentStep = function(step) {
      if ($scope.currentStep === 0) {
        return false;
      } else {
        return ($scope.currentStep % $scope.duration || $scope.duration) === step;
      }
    };

    function init () {
      $scope.setDuration($scope.duration);
      $scope.toggleStep('ClosedHihat', 3);
      $scope.toggleStep('ClosedHihat', 7);
      $scope.toggleStep('SnareDrum', 5);
      $scope.toggleStep('BassDrum', 1);
      $scope.toggleStep('BassDrum', 5);
    }

    init();

  });
}());
