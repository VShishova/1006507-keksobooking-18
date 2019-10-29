'use strict';

(function () {
  var mainSection = document.querySelector('main');
  var mapSection = mainSection.querySelector('.map');
  var mainPin = mapSection.querySelector('.map__pin--main');

  var pinTaleHeight = Number(window.getComputedStyle(mainPin, ':after').height.replace('px', ''));
  var disabledPinHeight = mainPin.offsetHeight / 2;
  var activePinHeight = mainPin.offsetHeight + pinTaleHeight;
  var mainPinStartCoord = new window.utils.Coordinate(mainPin.offsetLeft, mainPin.offsetTop);

  var MainPinLocation = {
    MIN_Y: 130 - mainPin.offsetHeight - pinTaleHeight,
    MAX_Y: 630 - mainPin.offsetHeight - pinTaleHeight,
    MIN_X: 0 - Math.round(mainPin.offsetWidth / 2),
    MAX_X: mapSection.querySelector('.map__pins').clientWidth - Math.round(mainPin.offsetWidth / 2)
  };

  var mapFiltersForm = mapSection.querySelector('.map__filters');
  var similarPinsListElement = mapSection.querySelector('.map__pins');
  var rentForm = document.querySelector('.ad-form');
  var pinAddressInput = rentForm.querySelector('#address');

  var pageActive;

  var onErrorEscPress = function (evt) {
    window.utils.onEscEvent(evt, function () {
      closeExchangeMessage('error', onErrorEscPress, onErrorClick);
    });
  };

  var onErrorClick = function () {
    closeExchangeMessage('error', onErrorEscPress, onErrorClick);
  };

  var onSuccessEscPress = function (evt) {
    window.utils.onEscEvent(evt, function () {
      closeExchangeMessage('success', onSuccessEscPress, onSuccessClick);
    });
  };

  var onSuccessClick = function () {
    closeExchangeMessage('success', onSuccessEscPress, onSuccessClick);
  };

  var closeExchangeMessage = function (elementClassName, escPressHandler, clickHandler) {
    var messageElement = document.querySelector('.' + elementClassName);
    messageElement.remove();

    document.removeEventListener('keydown', escPressHandler);
    document.removeEventListener('click', clickHandler);
  };

  var fillPinAddress = function () {
    var locationX = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2);
    var locationY = Math.round(mainPin.offsetTop + (pageActive ? activePinHeight : disabledPinHeight));

    pinAddressInput.readOnly = true;
    pinAddressInput.value = '' + locationX + ', ' + locationY;
  };

  var fillPinsListElement = function (rents) {
    var fragment = document.createDocumentFragment();

    while (similarPinsListElement.lastChild) {
      if (similarPinsListElement.lastChild === mainPin) {
        break;
      }
      similarPinsListElement.removeChild(similarPinsListElement.lastChild);
    }

    for (var i = 0; i < rents.length; i++) {
      fragment.appendChild(window.pin.renderPin(rents[i]));
    }

    similarPinsListElement.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var errorElement = window.utils.renderErrorMessage(errorMessage);
    var errorCloseButton = errorElement.querySelector('.error__button');
    errorCloseButton.addEventListener('click', function () {
      closeExchangeMessage('error', onErrorEscPress, onErrorClick);
    });

    mainSection.insertAdjacentElement('afterbegin', errorElement);

    document.addEventListener('keydown', onErrorEscPress);
    document.addEventListener('click', onErrorClick);
  };

  var successDataLoadHandler = function (rentsList) {
    window.utils.disableFormFields(mapFiltersForm, false);
    window.map.rentsData = rentsList;

    var filteredRents = window.filter.filterRents();
    fillPinsListElement(filteredRents);
  };

  var successDataSaveHandler = function () {
    rentForm.reset();
    mapFiltersForm.reset();

    window.utils.deleteRentCard();
    window.utils.deleteMapPins();

    mainPin.style.left = mainPinStartCoord.x + 'px';
    mainPin.style.top = mainPinStartCoord.y + 'px';

    var successInfoElement = window.utils.renderSuccessMessage();
    mainSection.insertAdjacentElement('afterbegin', successInfoElement);

    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', onSuccessClick);

    changePageStateInactive();
  };

  var changePageStateInactive = function () {
    mapSection.classList.add('map--faded');
    rentForm.classList.add('ad-form--disabled');
    window.utils.disableFormFields(rentForm, true);
    window.utils.disableFormFields(mapFiltersForm, true);

    pageActive = false;
    fillPinAddress();
  };

  var changePageStateActive = function () {
    window.data.load(successDataLoadHandler, errorHandler);

    mapSection.classList.remove('map--faded');
    rentForm.classList.remove('ad-form--disabled');
    window.utils.disableFormFields(rentForm, false);

    pageActive = true;
    fillPinAddress();
  };

  var moveMainPin = function (evt) {
    evt.preventDefault();

    var startCoords = new window.utils.Coordinate(evt.clientX, evt.clientY);
    var shift = new window.utils.Coordinate(0, 0);
    var newСoords = new window.utils.Coordinate(0, 0);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      shift.x = startCoords.x - moveEvt.clientX;
      shift.y = startCoords.y - moveEvt.clientY;

      startCoords.x = moveEvt.clientX;
      startCoords.y = moveEvt.clientY;

      newСoords.x = mainPin.offsetLeft - shift.x;
      newСoords.y = mainPin.offsetTop - shift.y;

      if (newСoords.x >= MainPinLocation.MIN_X && newСoords.x <= MainPinLocation.MAX_X) {
        mainPin.style.left = newСoords.x + 'px';
      }

      if (newСoords.y >= MainPinLocation.MIN_Y && newСoords.y <= MainPinLocation.MAX_Y) {
        mainPin.style.top = newСoords.y + 'px';
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

  changePageStateInactive();

  mainPin.addEventListener('mousedown', function (evt) {
    if (pageActive) {
      moveMainPin(evt);
    } else {
      changePageStateActive();
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (!pageActive) {
      window.utils.onEnterEvent(evt, changePageStateActive);
    }
  });

  rentForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.data.save(new FormData(rentForm), successDataSaveHandler, errorHandler);
  });

  window.map = {
    mapSection: mapSection,
    rentForm: rentForm,
    fillPinsListElement: fillPinsListElement,
    rentsData: []
  };
})();
