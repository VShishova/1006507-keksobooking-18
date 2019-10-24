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

  var getRandomList = function (arr) {
    var newArr = [];
    var maxElements = Math.floor(Math.random() * arr.length);

    for (var i = 0; i < maxElements; i++) {
      var randomElement = getRandomElement(arr);
      if (!(newArr.includes(randomElement))) {
        newArr.push(randomElement);
      }
    }

    return newArr;
  };

  var disableFormFields = function (formElement, disabledState) {
    for (var i = 0; i < formElement.children.length; i++) {
      formElement.children[i].disabled = disabledState;
    }
  };

  window.utils = {
    onEscEvent: onEscEvent,
    onEnterEvent: onEnterEvent,
    getRandomElement: getRandomElement,
    getRandomList: getRandomList,
    disableFormFields: disableFormFields,
    typesToNames: typesToNames,
    typesToPrice: typesToPrice
  };
})();
