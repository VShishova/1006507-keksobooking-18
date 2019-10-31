'use strict';

(function () {
  var Keycode = {
    ESC: 27,
    ENTER: 13
  };

  var SUCCESS_CODE = 200;

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

  var pricesToValues = {
    'low': {min: 0, max: 10000},
    'middle': {min: 10000, max: 50000},
    'high': {min: 50000}
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
      }, window.config.DEBOUNCE_INTERVAL);
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

  var deleteListItems = function (listElement, undeletedFirstElement) {
    while (listElement.lastChild) {
      if (listElement.lastChild === undeletedFirstElement) {
        break;
      }
      listElement.removeChild(listElement.lastChild);
    }
  };

  var deleteFieldsOutlines = function() {
    window.map.rentForm.querySelectorAll('input').forEach(function (el) {
      el.style.outline = 'none';
    });
  };

  window.utils = {
    SUCCESS_CODE: SUCCESS_CODE,
    typesToNames: typesToNames,
    filtersToFields: filtersToFields,
    pricesToValues: pricesToValues,
    Coordinate: Coordinate,
    onEscEvent: onEscEvent,
    onEnterEvent: onEnterEvent,
    getRandomElement: getRandomElement,
    disableFormFields: disableFormFields,
    renderErrorMessage: renderErrorMessage,
    renderSuccessMessage: renderSuccessMessage,
    deleteRentCard: deleteRentCard,
    deleteMapPins: deleteMapPins,
    debounce: debounce,
    deleteListItems: deleteListItems,
    deleteFieldsOutlines: deleteFieldsOutlines
  };
})();
