(function () {
  "use strict"

  Vue.component("vue-controls", {

    props: {
      isRunning: {
        required: true,
        type: Boolean,
      },

      seq: {
        required: true,
        type: Object,
      },
    },

    data: function () {
      return {
        bpms: [8, 16, 32],
        tempBpm: 8,
      }
    },

  })

})();
