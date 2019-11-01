'use strict';

(function () {
  var rentFormElement = document.querySelector('.ad-form');
  var roomNumberlement = rentFormElement.querySelector('#room_number');
  var capacityElement = rentFormElement.querySelector('#capacity');
  var typeElement = rentFormElement.querySelector('#type');
  var priceElement = rentFormElement.querySelector('#price');
  var timeInElement = rentFormElement.querySelector('#timein');
  var timeOutElement = rentFormElement.querySelector('#timeout');
  var tiileElement = rentFormElement.querySelector('#title');

  var onInputCheckCapacity = function () {
    var guestNumber = window.config.roomsToGuests[roomNumberlement.value.toString()];

    if (capacityElement.value < guestNumber.min || capacityElement.value > guestNumber.max) {
      capacityElement.setCustomValidity('Некорректно указано количество мест!');
      capacityElement.style.outline = window.config.invalidElementOutlineStyle;
    } else {
      capacityElement.setCustomValidity('');
      capacityElement.style.outline = 'none';
    }
    capacityElement.reportValidity();
  };

  var onInputCheckPrice = function () {
    var minPrice = window.config.typesToMinPrices[typeElement.value];

    priceElement.placeholder = minPrice;
    priceElement.min = minPrice;

    if (priceElement.value < minPrice) {
      priceElement.setCustomValidity('Для данного типа жилья минимальная цена: ' + minPrice);
    } else {
      priceElement.setCustomValidity('');
      priceElement.style.outline = 'none';
    }
  };

  var changeTime = function (recentField, changeField) {
    changeField.value = recentField.value;
  };

  roomNumberlement.addEventListener('input', onInputCheckCapacity);
  capacityElement.addEventListener('input', onInputCheckCapacity);
  typeElement.addEventListener('input', onInputCheckPrice);
  priceElement.addEventListener('blur', onInputCheckPrice);
  timeInElement.addEventListener('input', function () {
    changeTime(timeInElement, timeOutElement);
  });
  timeOutElement.addEventListener('input', function () {
    changeTime(timeOutElement, timeInElement);
  });
  tiileElement.addEventListener('input', function () {
    if (tiileElement.validity.valid) {
      tiileElement.style.outline = 'none';
    }
  });
  rentFormElement.querySelectorAll('input').forEach(function (el) {
    el.addEventListener('invalid', function () {
      el.style.outline = window.config.invalidElementOutlineStyle;
    });
  });

  rentFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.data.save(new FormData(rentFormElement), window.init.onSuccessSave, window.init.onError);
  });

  rentFormElement.querySelector('.ad-form__reset').addEventListener('click', function (evt) {
    evt.preventDefault();
    window.init.resetData();
    window.init.changePageStateInactive();
  });

  window.form = {
    rentFormElement: rentFormElement
  };
})();
