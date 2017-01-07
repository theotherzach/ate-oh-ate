;(function () {
  "use strict";

  angular.module("app", []);

  function bootstrap() {
    new Vue({
      el: "#app"
    })
  }

  if (document.readyState != 'loading'){
    setTimeout(bootstrap, 0)
  } else {
    document.addEventListener('DOMContentLoaded', bootstrap);
  }
}());
