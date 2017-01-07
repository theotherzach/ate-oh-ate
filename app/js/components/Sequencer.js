(function () {
  "use strict"

  Vue.component("vue-sequencer", {

    data: function () {
      return {
        seq: {},
        stepId: null,
      }
    },

    created: function () {
      var self = this
      self.seq = new Sequencer()
      self.setDefault()
    },

    computed: {

      isRunning: function () {
        var self = this
        return self.stepId !== null;
      },

    },

    methods: {

      setDefault: function () {
        var self = this

        self.seq.toggleStep('ClosedHihat', 3);
        self.seq.toggleStep('ClosedHihat', 7);
        self.seq.toggleStep('SnareDrum', 5);
        self.seq.toggleStep('BassDrum', 1);
        self.seq.toggleStep('BassDrum', 5);
      },

      step: function() {
        var self = this
        return setTimeout(function () {
          self.seq.tick();
          self.seq.playStep();
          self.stepId = self.step();
        }, self.seq.msToNextStep());
      },

      toggleSequence: function () {
        console.log("toggleSequence")
        var self = this
        if (self.isRunning) {
          self.stopSequence()
        } else {
          self.startSequence()
        }
      },

      stopSequence: function () {
        var self = this
        clearTimeout(self.stepId);
        self.seq.resetCurrentStep();
        self.stepId = null;
      },

      startSequence: function () {
        var self = this
        self.stepId = self.step();
      },
    },

  })
})();
