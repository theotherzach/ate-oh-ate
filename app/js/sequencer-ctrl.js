;(function () {
  "use strict";

  angular.module("app").controller("sequencerCtrl", function ($scope, $timeout) {

    // ======== STATE ========
    var patterns = {
      CYmbal: [],
      ClosedHihat: [3, 7, 11, 15],
      OpenHihat: [],
      HCP: [],
      COWbell: [],
      HiTom: [],
      MidTom: [],
      LowTom: [],
      SnareDrum: [5, 13],
      BassDrum: [1, 5, 9, 13],
      ACcent: []
    };

    var tickId = null;

    $scope.currentStep = 0;

    $scope.bpm = 128;

    $scope.duration = 16;
    // =======================


    $scope.steps = function (duration) {
      return _.range(1, parseInt(duration, 10) + 1);
    }

    var stepInstruments = $scope.steps($scope.duration).map(function(step) {
      return {
        CYmbal: new Audio('/Cymbal/Cym80815.wav'),
        HCP: new Audio('/Clap/Clap80823.wav'),
        COWbell: new Audio('/CowBell/Cowbell80810.wav'),
        HiTom: new Audio('/Toms/Tom80844.wav'),
        MidTom: new Audio('/Toms/Tom80819.wav'),
        LowTom: new Audio('/Toms/Tom8086.wav'),
        ClosedHihat: new Audio('/ClosedHiHat/CH80833.wav'),
        OpenHihat: new Audio('/OpenHiHat/OH80817.wav'),
        SnareDrum: new Audio('/SnareDrum/Snare80837.wav'),
        BassDrum: new Audio('/BassDrum/Un-Pitched/Kick80810.wav'),
      };
    });


    $scope.isRunning = function () {
      return tickId !== null;
    };

    $scope.instruments = Object.keys(patterns);

    $scope.toggleStep = function (instrument, step) {
      var pattern = patterns[instrument];

      if (pattern.indexOf(step) > -1) {
        pattern.splice(pattern.indexOf(step), 1);
      } else {
        pattern.push(step);
      }
    };

    $scope.note = function (instrument, step) {
      if (patterns[instrument].indexOf(step) > -1) {
        return "o";
      } else {
        return "";
      }
    };

    function msToNextStep(bpm, duration) {
      return (((60 / bpm) * 4)  / duration) * 1000;
    }

    function tick(duration) {
      var bpm = parseInt($scope.bpm, 10) || 60;

      return $timeout(function () {
        $scope.currentStep = ($scope.currentStep + 1) % duration || duration;
        _(stepInstruments[$scope.currentStep - 1]).each(function(instrument, key) {
          if (patterns[key].indexOf($scope.currentStep) > -1) {
            instrument.play()
          }
        });
        tickId = tick(duration);
      }, msToNextStep(bpm, duration));
    }

    $scope.toggleSequence = function () {
      if ($scope.isRunning()) {
        $timeout.cancel(tickId);
        $scope.currentStep = 0;
        tickId = null;
      } else {
        tickId = tick(parseInt($scope.duration, 10));
      }
    };

  });
}());
