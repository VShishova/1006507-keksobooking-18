'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var getRandomElement = function (arr) {
    var randomElement = Math.floor(Math.random() * arr.length);
    return arr[randomElement];
  };

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomElement: getRandomElement,
    getRandomList: function (arr) {
      var newArr = [];
      var maxElements = Math.floor(Math.random() * arr.length);

      for (var i = 0; i < maxElements; i++) {
        var randomElement = getRandomElement(arr);
        if (!(newArr.includes(randomElement))) {
          newArr.push(randomElement);
        }
      }

      return newArr;
    },
    disableFormFields: function (formElement, disabledState) {
      for (var i = 0; i < formElement.children.length; i++) {
        formElement.children[i].disabled = disabledState;
      }
    }
  };
})();
