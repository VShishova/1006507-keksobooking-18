'use strict';

(function () {
  var mapSectionElement = document.querySelector('.map');
  var mainPinElement = mapSectionElement.querySelector('.map__pin--main');

  var pinTaleHeight = Number(window.getComputedStyle(mainPinElement, ':after').height.replace('px', ''));
  var disabledPinHeight = mainPinElement.offsetHeight / 2;
  var activePinHeight = mainPinElement.offsetHeight + pinTaleHeight;
  var mainPinStartCoord = new window.utils.Coordinate(mainPinElement.offsetLeft, mainPinElement.offsetTop);

  var MainPinCoords = {
    MIN_Y: window.config.MainPinLocation.MIN_Y - mainPinElement.offsetHeight - pinTaleHeight,
    MAX_Y: window.config.MainPinLocation.MAX_Y - mainPinElement.offsetHeight - pinTaleHeight,
    MIN_X: window.config.MainPinLocation.MIN_X - Math.round(mainPinElement.offsetWidth / 2),
    MAX_X: window.config.MainPinLocation.MAX_X - Math.round(mainPinElement.offsetWidth / 2)
  };

  var pinsListElement = mapSectionElement.querySelector('.map__pins');
  var pinAddressElement = window.form.rentFormElement.querySelector('#address');
  pinAddressElement.readOnly = true;

  var setStartPinCoords = function () {
    mainPinElement.style.left = mainPinStartCoord.x + 'px';
    mainPinElement.style.top = mainPinStartCoord.y + 'px';
  };

  var fillPinAddress = function (pageActive) {
    var locationX = Math.round(mainPinElement.offsetLeft + mainPinElement.offsetWidth / 2);
    var locationY = Math.round(mainPinElement.offsetTop + (pageActive ? activePinHeight : disabledPinHeight));

    pinAddressElement.value = '' + locationX + ', ' + locationY;
  };

  var fillPinsList = function (rents) {
    var fragment = document.createDocumentFragment();
    window.utils.deleteListItems(pinsListElement, mainPinElement);

    rents.forEach(function (el) {
      fragment.appendChild(window.pin.renderPin(el));
    });

    pinsListElement.appendChild(fragment);
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

      newСoords.x = mainPinElement.offsetLeft - shift.x;
      newСoords.y = mainPinElement.offsetTop - shift.y;

      if (newСoords.x >= MainPinCoords.MIN_X && newСoords.x <= MainPinCoords.MAX_X) {
        mainPinElement.style.left = newСoords.x + 'px';
      }

      if (newСoords.y >= MainPinCoords.MIN_Y && newСoords.y <= MainPinCoords.MAX_Y) {
        mainPinElement.style.top = newСoords.y + 'px';
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

  mainPinElement.addEventListener('mousedown', function (evt) {
    if (window.init.pageActive) {
      moveMainPin(evt);
    } else {
      window.init.changePageStateActive();
    }
  });

  mainPinElement.addEventListener('keydown', function (evt) {
    if (!window.init.pageActive) {
      window.utils.onEnterEvent(evt, window.init.changePageStateActive);
    }
  });

  window.map = {
    mapSectionElement: mapSectionElement,
    fillPinAddress: fillPinAddress,
    fillPinsList: fillPinsList,
    setStartPinCoords: setStartPinCoords
  };
})();
