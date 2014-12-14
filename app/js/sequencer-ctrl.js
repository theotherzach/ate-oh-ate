;(function () {
  "use strict";

  angular.
    module("app").
    controller("sequencerCtrl", function ($scope, $timeout) {

    $scope.seq = new Sequencer();

    var stepId = null;

    function step() {
      return $timeout(function () {
        $scope.seq.tick();
        $scope.seq.playStep();
        stepId = step();
      }, $scope.seq.msToNextStep());
    }


    $scope.isRunning = function () {
      return stepId !== null;
    };

    $scope.toggleSequence = function () {
      if ($scope.isRunning()) {
        $timeout.cancel(stepId);
        $scope.seq.resetCurrentStep();
        stepId = null;
      } else {
        stepId = step();
      }
    };

    function init() {
      $scope.seq.toggleStep('ClosedHihat', 3);
      $scope.seq.toggleStep('ClosedHihat', 7);
      $scope.seq.toggleStep('SnareDrum', 5);
      $scope.seq.toggleStep('BassDrum', 1);
      $scope.seq.toggleStep('BassDrum', 5);
    }

    init();
  });
}());
