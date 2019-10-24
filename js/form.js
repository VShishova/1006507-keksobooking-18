'use strict';

(function () {
  var roomNumberInput = window.map.rentForm.querySelector('#room_number');
  var capacityInput = window.map.rentForm.querySelector('#capacity');
  var typeInput = window.map.rentForm.querySelector('#type');
  var priceInput = window.map.rentForm.querySelector('#price');
  var timeInInput = window.map.rentForm.querySelector('#timein');
  var timeOutInput = window.map.rentForm.querySelector('#timeout');

  var onInputCheckCapacity = function () {
    if ((capacityInput.value === '0' && roomNumberInput.value !== '100') ||
        (capacityInput.value !== '0' && roomNumberInput.value === '100') ||
        (Number(capacityInput.value) > Number(roomNumberInput.value))) {
      capacityInput.setCustomValidity('Некорректно указано количество мест!');
      capacityInput.style = 'border-color: red';
    } else {
      capacityInput.setCustomValidity('');
      capacityInput.style = 'border-color: #d9d9d3';
    }
    capacityInput.reportValidity();
  };

  var onInputCheckPrice = function () {
    var minPrice = window.utils.typesToPrice[typeInput.value];

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
