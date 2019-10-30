'use strict';

(function () {
  var roomNumberInput = window.map.rentForm.querySelector('#room_number');
  var capacityInput = window.map.rentForm.querySelector('#capacity');
  var typeInput = window.map.rentForm.querySelector('#type');
  var priceInput = window.map.rentForm.querySelector('#price');
  var timeInInput = window.map.rentForm.querySelector('#timein');
  var timeOutInput = window.map.rentForm.querySelector('#timeout');

  var onInputCheckCapacity = function () {
    var guestNumber = window.config.roomsToGuests[roomNumberInput.value.toString()];

    if (capacityInput.value < guestNumber.min || capacityInput.value > guestNumber.max) {
      capacityInput.setCustomValidity('Некорректно указано количество мест!');
      capacityInput.style = window.config.invalidElementStyle;
    } else {
      capacityInput.setCustomValidity('');
      capacityInput.style = window.config.activeValidElementStyle;
    }
    capacityInput.reportValidity();
  };

  var onInputCheckPrice = function () {
    var minPrice = window.config.typesToMinPrices[typeInput.value];

    priceInput.placeholder = minPrice;
    priceInput.min = minPrice;

    if (priceInput.value < minPrice) {
      priceInput.setCustomValidity('Для данного типа жилья минимальная цена: ' + minPrice);
    } else {
      priceInput.setCustomValidity('');
    }
  };

  var changeTime = function (recentField, changeField) {
    changeField.value = recentField.value;
  };

  roomNumberInput.addEventListener('input', onInputCheckCapacity);
  capacityInput.addEventListener('input', onInputCheckCapacity);
  typeInput.addEventListener('input', onInputCheckPrice);
  priceInput.addEventListener('blur', onInputCheckPrice);
  timeInInput.addEventListener('input', function () {
    changeTime(timeInInput, timeOutInput);
  });
  timeOutInput.addEventListener('input', function () {
    changeTime(timeOutInput, timeInInput);
  });
})();
