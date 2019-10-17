'use strict';

(function () {
  var mapSection = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var LOC_MIN_Y = 130;
  var LOC_MAX_Y = 600;
  var LOC_MIN_X = mainPin.offsetWidth;
  var LOC_MAX_X = mapSection.querySelector('.map__pins').offsetWidth;

  var mapFiltersForm = document.querySelector('.map__filters');
  var similarPinsListElement = mapSection.querySelector('.map__pins');
  var rentForm = document.querySelector('.ad-form');
  var pinAddressInput = rentForm.querySelector('#address');

  var PageActive = false;

  var fillPinAddress = function (dividerY) {
    var locationX = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2);
    var locationY = Math.round(mainPin.offsetTop + mainPin.offsetHeight / dividerY);
    pinAddressInput.readOnly = true;
    pinAddressInput.value = '' + locationX + ', ' + locationY;
  };

  var fillPinsListElement = function (rents) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < rents.length; i++) {
      fragment.appendChild(window.pin.renderPin(rents[i]));
    }

    similarPinsListElement.appendChild(fragment);
  };

  var changePageStateActive = function () {
    var rentsList = window.data.renderRents();

    mapSection.classList.remove('map--faded');
    rentForm.classList.remove('ad-form--disabled');
    window.utils.disableFormFields(rentForm, false);

    fillPinsListElement(rentsList);
    fillPinAddress(1);

    window.utils.disableFormFields(mapFiltersForm, false);

    PageActive = true;
  };

  var moveMainPin = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.pageX,
      y: evt.pageY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: 0,
        y: 0
      };

      if (moveEvt.pageX > LOC_MIN_X && moveEvt.pageX < LOC_MAX_X) {
        shift.x = startCoords.x - moveEvt.pageX;
        startCoords.x = moveEvt.pageX;
      }

      if (moveEvt.pageY > LOC_MIN_Y && moveEvt.pageY < LOC_MAX_Y) {
        shift.y = startCoords.y - moveEvt.pageY;
        startCoords.y = moveEvt.pageY;
      }

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      fillPinAddress(1);
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
  fillPinAddress(2);

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
    rentForm: rentForm,
    LOC_MIN_Y: LOC_MIN_Y,
    LOC_MAX_Y: LOC_MAX_Y,
    LOC_MAX_X: LOC_MAX_X
  };
})();
