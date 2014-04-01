define([], function() {
  "use strict";
  var __moduleName = "something";
  var Something = function Something() {};
  ($traceurRuntime.createClass)(Something, {sum: function(a, b) {
      return a + b;
    }}, {});
  Something.prototype.sum.parameters = [[$traceurRuntime.type.number], [$traceurRuntime.type.number]];
  ;
  return {
    get Something() {
      return Something;
    },
    __esModule: true
  };
});
