'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var getRandomElement = function (arr) {
    var randomNumber = Math.floor(Math.random() * arr.length);
    return arr[randomNumber];
  };

  var onEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var onEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
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

  var mapTypesToNames = function (rentType) {
    var typeName = '';

    switch (rentType) {
      case 'flat':
        typeName = 'Квартира';
        break;
      case 'bungalo':
        typeName = 'Бунгало';
        break;
      case 'house':
        typeName = 'Дом';
        break;
      case 'palace':
        typeName = 'Дворец';
    }

    return typeName;
  };

  var mapTypesToPrice = function (rentType) {
    var Price = 0;

    switch (rentType) {
      case 'flat':
        Price = 1000;
        break;
      case 'house':
        Price = 5000;
        break;
      case 'palace':
        Price = 10000;
    }

    return Price;
  };

  window.utils = {
    onEscEvent: onEscEvent,
    onEnterEvent: onEnterEvent,
    getRandomElement: getRandomElement,
    getRandomList: getRandomList,
    disableFormFields: disableFormFields,
    mapTypesToNames: mapTypesToNames,
    mapTypesToPrice: mapTypesToPrice
  };
})();
