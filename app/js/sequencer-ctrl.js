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

    $scope.isRunning = false;

    $scope.currentStep = 1;

    $scope.bpm = 60;
    // =======================

    $scope.steps = _.range(1, 17);

    $scope.instruments = Object.keys(patterns);

    $scope.toggleStep = function (instrument, step) {
      var beats = patterns[instrument];

      if (beats.indexOf(step) > -1) {
        beats.splice(beats.indexOf(step), 1);
      } else {
        beats.push(step);
      }
    };

    $scope.note = function (instrument, step) {
      if (patterns[instrument].indexOf(step) > -1) {
        return "o";
      } else {
        return "";
      }
    };

    function tick() {
      if ($scope.isRunning) {
        return $timeout(function () {
          $scope.currentStep = ($scope.currentStep + 1) % 16 || 16;
          tickId = tick();
        }, (60 / $scope.bpm) * 1000)
      }
    }

    $scope.toggleSequence = function () {
      if ($scope.isRunning) {
        $scope.isRunning = false;
        $timeout.cancel(tickId);
      } else {
        $scope.isRunning = true;
        tickId = tick();
      }
    };

  });
}());
