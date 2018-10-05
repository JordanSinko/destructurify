'use strict';

module.exports = function(fn) {
  return Object.defineProperty(
    function() {
      return fn
        .apply(this, arguments)
        .then(
          response => ({ response, error: null }),
          error => ({ error, response: null })
        );
    },
    'name',
    { value: fn.name }
  );
};
