describe("Clock", function () {
  "use strict";
  var clock = null;
  beforeEach(function () {
    clock = new Clock;
  });

  it("Is set to 60 BPM by default", function () {
    expect(clock.getBPM()).toBe(60);
  });

  it("can change BPM", function () {
    expect(clock.setBPM(120).getBPM()).toBe(120);
  });

  it("fails on BPM <= 0", function () {
    expect(function (){
      clock.setBPM(0);
    }).toThrow();
  });

  describe("#run", function () {
    var start, finish;
    beforeEach(function (done) {
      var counter = 0;
      clock.run(function () {
        counter += 1;
        if (counter === 2) {
          start = new Date()
        } else if (counter === 3) { 
          finish = new Date()
          done();
        }
      }, 1)
    });

    it("executes a given fn on run", function () {
      expect(finish - start).toBeLessThan(1100);
      expect(finish - start).toBeGreaterThan(900);
    });
  });

});
