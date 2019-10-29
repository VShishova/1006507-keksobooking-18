'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var REQUEST_TIMEOUT = 10000;
  var DEBOUNCE_INTERVAL = 500;

  var MAX_RENTS_NUMBER = 5;

  window.config = {
    URL: URL,
    REQUEST_TIMEOUT: REQUEST_TIMEOUT,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    MAX_RENTS_NUMBER: MAX_RENTS_NUMBER
  };
})();
