'use strict';

(function () {
  var rentForm = document.querySelector('.ad-form');
  var pinAddressInput = rentForm.querySelector('#address');
  var roomNumberInput = rentForm.querySelector('#room_number');
  var capacityInput = rentForm.querySelector('#capacity');

  var fillPinAddress = function (pin, dividerY) {
    var locationX = Math.round(pin.offsetLeft + pin.offsetWidth / 2);
    var locationY = Math.round(pin.offsetTop + pin.offsetHeight / dividerY);
    pinAddressInput.readOnly = true;
    pinAddressInput.value = '' + locationX + ', ' + locationY;
  };

  var onInputCheckCapacity = function () {
    return function () {
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
  };

  window.util.disableFormFields(rentForm, true);
  fillPinAddress(window.map.mainPin, 2);

  roomNumberInput.addEventListener('input', onInputCheckCapacity());
  capacityInput.addEventListener('input', onInputCheckCapacity());

  window.form = {
    rentForm: rentForm,
    fillPinAddress: fillPinAddress
  };
})();
