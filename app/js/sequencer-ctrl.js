;(function () {
  "use strict";

  angular.module("app").controller("sequencerCtrl", function ($scope) {
    $scope.steps = _.range(1, 17);

    $scope.instruments = "CYmbal HiHat HCP COWbell HiTom MidTom LowTom SnareDrum BassDrum ACcent".split(" ");

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

    $scope.toggleStep = function (instrument, step) {
      var beats = patterns[instrument];
      if (beats.indexOf(step) > -1) {
        beats.splice(beats.indexOf(step), 1);
      } else {
        beats.push(step);
      }
    };

    $scope.note = function(instrument, step) {
      if (patterns[instrument].indexOf(step) > -1) {
        return "o";
      } else {
        return "";
      }
    };
  });
}());
