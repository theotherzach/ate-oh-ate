;(function () {
  "use strict";

  angular.module("app").controller("sequencerCtrl", function ($scope, $interval) {

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

    $scope.currentStep = 1;

    $scope.isRunning = false;

    $scope.steps = _.range(1, 17);

    $scope.instruments = "CYmbal HiHat HCP COWbell HiTom MidTom LowTom SnareDrum BassDrum ACcent".split(" ");

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
      return $interval(function () {
        $scope.currentStep = ($scope.currentStep + 1) % 16 || 16
      }, 1000)
    }

    $scope.toggleSequence = function () {
      if ($scope.isRunning) {
        console.log('hai')
        $interval.cancel($scope.isRunning);
        $scope.isRunning = false;
      } else {
        $scope.isRunning = tick();
      }
    };

  });
}());
