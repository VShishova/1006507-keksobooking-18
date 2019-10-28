'use strict';

(function () {
  var Keycode = {
    ESC: 27,
    ENTER: 13
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

  window.utils = {
    onEscEvent: onEscEvent,
    onEnterEvent: onEnterEvent,
    getRandomElement: getRandomElement,
    disableFormFields: disableFormFields,
    typesToNames: typesToNames,
    typesToPrice: typesToPrice,
    renderErrorMessage: renderErrorMessage,
    renderSuccessMessage: renderSuccessMessage
  };
})();
