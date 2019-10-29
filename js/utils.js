'use strict';

(function () {
  var Keycode = {
    ESC: 27,
    ENTER: 13
  };

  var MAX_RENTS_NUMBER = 5;
  var DEBOUNCE_INTERVAL = 500;

  var Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
  };

  var filtersToFields = {
    'housing-type': 'type',
    'housing-rooms': 'rooms',
    'housing-guests': 'guests',
    'features': 'features'
  };

  var typesToNames = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var typesToPrice = {
    'flat': 1000,
    'bungalo': 0,
    'house': 5000,
    'palace': 10000
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var getRandomElement = function (arr) {
    var randomNumber = Math.floor(Math.random() * arr.length);
    return arr[randomNumber];
  };

  var onEscEvent = function (evt, action) {
    if (evt.keyCode === Keycode.ESC) {
      action();
    }
  };

  var onEnterEvent = function (evt, action) {
    if (evt.keyCode === Keycode.ENTER) {
      action();
    }
  };

  var disableFormFields = function (formElement, disabledState) {
    for (var i = 0; i < formElement.children.length; i++) {
      formElement.children[i].disabled = disabledState;
    }
  };

  var renderErrorMessage = function (errorMessage) {
    var similarErrorTemplate = document.querySelector('#error').content.querySelector('.error');

    var errorElement = similarErrorTemplate.cloneNode(true);
    var errorMessageElement = errorElement.querySelector('.error__message');
    errorMessageElement.textContent = errorMessage;

    return errorElement;
  };

  var renderSuccessMessage = function () {
    var similarSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = similarSuccessTemplate.cloneNode(true);

    return successElement;
  };

  var deleteRentCard = function () {
    var rentCard = window.map.mapSection.querySelector('.map__card');
    if (rentCard) {
      rentCard.remove();
    }
  };

  var deleteMapPins = function () {
    var mapPins = window.map.mapSection.querySelectorAll('.map__pin');
    for (var i = mapPins.length - 1; i > 0; i--) {
      mapPins[i].remove();
    }
  };

  window.utils = {
    MAX_RENTS_NUMBER: MAX_RENTS_NUMBER,
    Coordinate: Coordinate,
    onEscEvent: onEscEvent,
    onEnterEvent: onEnterEvent,
    getRandomElement: getRandomElement,
    disableFormFields: disableFormFields,
    typesToNames: typesToNames,
    typesToPrice: typesToPrice,
    renderErrorMessage: renderErrorMessage,
    renderSuccessMessage: renderSuccessMessage,
    filtersToFields: filtersToFields,
    deleteRentCard: deleteRentCard,
    deleteMapPins: deleteMapPins,
    debounce: debounce
  };
})();
