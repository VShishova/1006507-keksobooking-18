'use strict';

(function () {
  var roomNumberInput = window.map.rentForm.querySelector('#room_number');
  var capacityInput = window.map.rentForm.querySelector('#capacity');

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

  roomNumberInput.addEventListener('input', onInputCheckCapacity());
  capacityInput.addEventListener('input', onInputCheckCapacity());
})();
