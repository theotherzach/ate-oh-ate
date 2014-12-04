;(function () {
  "use strict";

  angular.module("app").controller("sequencerCtrl", function ($scope, $timeout) {

    // ======== STATE ========
    var patterns = {
      CYmbal: [],
      HiHat: [3, 7, 11, 15],
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

    $scope.bpm = 60;
    // =======================


    // 8 steps = 1 bar = 4 beats
    $scope.steps = _.range(1, 17);


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

    function msToNextStep(bpm) {
      return (((60 / bpm) * 4) / 8) * 1000;
    }

    function tick() {
      var bpm = parseInt($scope.bpm, 10) || 60;

      return $timeout(function () {
        $scope.currentStep = ($scope.currentStep + 1) % 16 || 16;
        tickId = tick();
      }, msToNextStep(bpm));
    }

    $scope.toggleSequence = function () {
      if ($scope.isRunning()) {
        $timeout.cancel(tickId);
        $scope.currentStep = 0;
        tickId = null;
      } else {
        tickId = tick();
      }
    };

  });
}());
