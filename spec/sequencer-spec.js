describe("Sequencer", function () {
  var sequencer = null;
  beforeEach(function () {
    sequencer = new Sequencer();
  });

  it("sets bpm to 128 by default", function () {
    expect(sequencer.bpm).toBe(128);
  });

  it("can change bpm", function () {
    sequencer.setBpm("60");
    expect(sequencer.bpm).toBe(60);
  });

  it("has 8 steps by default", function () {
    expect(sequencer.steps).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("can change duration", function () {
    sequencer.setDuration(16);
    expect(sequencer.steps).toContain(16);
  });

  it("has an array of instruments", function () {
    expect(sequencer.instruments).toContain("HCP");
  });

  it("#isCurrentStep returns false when current step is 0", function () {
    expect(sequencer.isCurrentStep(1)).toBe(false);
  });

  it("#isCurrentStep when duration === currentStep", function () {
    _(8).times(function () {
      sequencer.tick();
    });
    expect(sequencer.isCurrentStep(8)).toBe(true);
  });

  describe("after 9 calls to #tick", function () {
    beforeEach(function () {
      _(9).times(function() {
        sequencer.tick();
      });
    });

    it("is on step 1 at duration 8", function () {
      expect(sequencer.isCurrentStep(1)).toBe(true);
    });

    it("is on step 9 at duration 16", function () {
      sequencer.setDuration(16);
      expect(sequencer.isCurrentStep(9)).toBe(true);
    });
  });

  describe("#isActiveInstrument returns", function () {
    beforeEach(function () {
      sequencer.setDuration(16).toggleStep("BassDrum", 1);
    });

    it("true when current instrument is active", function () {
      expect(sequencer.isActiveInstrument("BassDrum", 1)).toBe(true);
    });

    it("false due to duration missmatch", function () {
      sequencer.setDuration(32);
      expect(sequencer.isActiveInstrument("BassDrum", 1)).toBe(false);
    });

    it("false due to step missmatch", function () {
      expect(sequencer.isActiveInstrument("BassDrum", 2)).toBe(false);
    });

    it("false due to instrument missmatch", function () {
      expect(sequencer.isActiveInstrument("HCP", 2)).toBe(false);
    });

    it("false after toggling instrument back off", function () {
      sequencer.setDuration(16).toggleStep("BassDrum", 1);
      expect(sequencer.isActiveInstrument("BassDrum", 1)).toBe(false);
    });
  });

  it("#msToNextStep", function () {
    expect(sequencer.msToNextStep()).toBeCloseTo(117, 0)
  });

});
