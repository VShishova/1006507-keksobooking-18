'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var REQUEST_TIMEOUT = 10000;
  var DEBOUNCE_INTERVAL = 500;

  var MAX_RENTS_NUMBER = 5;

  var MainPinLocation = {
    MIN_Y: 130,
    MAX_Y: 630,
    MIN_X: 0,
    MAX_X: document.querySelector('.map__pins').clientWidth
  };

  var PICTURE_FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var roomsToGuests = {
    '1': {min: 1, max: 1},
    '2': {min: 1, max: 2},
    '3': {min: 1, max: 3},
    '100': {min: 0, max: 0}
  };

  var typesToMinPrices = {
    'flat': 1000,
    'bungalo': 0,
    'house': 5000,
    'palace': 10000
  };

  var invalidElementOutlineStyle = '2px solid red';

  window.config = {
    URL: URL,
    REQUEST_TIMEOUT: REQUEST_TIMEOUT,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    MAX_RENTS_NUMBER: MAX_RENTS_NUMBER,
    MainPinLocation: MainPinLocation,
    PICTURE_FILE_TYPES: PICTURE_FILE_TYPES,
    roomsToGuests: roomsToGuests,
    typesToMinPrices: typesToMinPrices,
    invalidElementOutlineStyle: invalidElementOutlineStyle
  };
})();
