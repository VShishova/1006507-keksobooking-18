'use strict';

(function () {
  var mapSection = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var pinTaleHeight = Number(window.getComputedStyle(mainPin, ':after').height.replace('px', ''));
  var disabledPinHeight = mainPin.offsetHeight / 2;
  var activePinHeight = mainPin.offsetHeight + pinTaleHeight;

  var LOC_MIN_Y = 130 - mainPin.offsetHeight - pinTaleHeight;
  var LOC_MAX_Y = 630 - mainPin.offsetHeight - pinTaleHeight;
  var LOC_MIN_X = 0 - Math.round(mainPin.offsetWidth / 2);
  var LOC_MAX_X = mapSection.querySelector('.map__pins').clientWidth - Math.round(mainPin.offsetWidth / 2);

  var MAX_RENTS_NUMBER = 5;

  var mapFiltersForm = document.querySelector('.map__filters');
  var similarPinsListElement = mapSection.querySelector('.map__pins');
  var rentForm = document.querySelector('.ad-form');
  var pinAddressInput = rentForm.querySelector('#address');

  var PageActive = false;

  var onErrorEscPress = function (evt) {
    window.utils.onEscEvent(evt, closeErrorMessage);
  };

  var closeErrorMessage = function () {
    var errorMessage = document.querySelector('.error');

    document.removeEventListener('keydown', onErrorEscPress);
    errorMessage.remove();
  };

  var fillPinAddress = function (pageActive) {
    var locationX = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2);
    var locationY = Math.round(mainPin.offsetTop + (pageActive ? activePinHeight : disabledPinHeight));

    pinAddressInput.readOnly = true;
    pinAddressInput.value = '' + locationX + ', ' + locationY;
  };

  var fillPinsListElement = function (rents) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_RENTS_NUMBER; i++) {
      fragment.appendChild(window.pin.renderPin(rents[i]));
    }

    similarPinsListElement.appendChild(fragment);
  };

  var renderErrorMessage = function (errorMessage) {
    var similarErrorTemplate = document.querySelector('#error').content.querySelector('.error');

    var errorElement = similarErrorTemplate.cloneNode(true);
    var errorMessageElement = errorElement.querySelector('.error__message');
    var errorCloseButton = errorElement.querySelector('.error__button');

    errorMessageElement.textContent = errorMessage;
    errorCloseButton.addEventListener('click', closeErrorMessage);

    return errorElement;
  };

  var errorHandler = function (errorMessage) {
    var mainSection = document.querySelector('main');
    var errorElement = renderErrorMessage(errorMessage);
    mainSection.insertAdjacentElement('afterbegin', errorElement);

    document.addEventListener('keydown', onErrorEscPress);
  };

  var successDataLoadHandler = function (rentsList) {
    fillPinsListElement(rentsList);
    window.utils.disableFormFields(mapFiltersForm, false);
  };

  var changePageStateActive = function () {
    window.data.load(successDataLoadHandler, errorHandler);

    mapSection.classList.remove('map--faded');
    rentForm.classList.remove('ad-form--disabled');
    window.utils.disableFormFields(rentForm, false);
    fillPinAddress(true);

    PageActive = true;
  };

  var moveMainPin = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newСoordinates = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y,
      };

      if (newСoordinates.x >= LOC_MIN_X && newСoordinates.x <= LOC_MAX_X) {
        mainPin.style.left = newСoordinates.x + 'px';
      }

      if (newСoordinates.y >= LOC_MIN_Y && newСoordinates.y <= LOC_MAX_Y) {
        mainPin.style.top = newСoordinates.y + 'px';
      }

      fillPinAddress(true);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.utils.disableFormFields(mapFiltersForm, true);
  window.utils.disableFormFields(rentForm, true);
  fillPinAddress(false);

  mainPin.addEventListener('mousedown', function (evt) {
    if (PageActive) {
      moveMainPin(evt);
    } else {
      changePageStateActive();
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (!PageActive) {
      window.utils.onEnterEvent(evt, changePageStateActive);
    }
  });

  window.map = {
    mapSection: mapSection,
    rentForm: rentForm
  };
})();
