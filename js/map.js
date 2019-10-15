'use strict';

(function () {

  var mapSection = document.querySelector('.map');
  var mapFiltersForm = document.querySelector('.map__filters');
  var mainPin = document.querySelector('.map__pin--main');
  var similarPinsListElement = mapSection.querySelector('.map__pins');

  var rentForm = document.querySelector('.ad-form');
  var pinAddressInput = rentForm.querySelector('#address');

  var PageActive = false;

  var onPopupEscPress = function (evt) {
    window.utils.onEscEvent(evt, closeCardPopup);
  };

  var closeCardPopup = function () {
    var rentCard = mapSection.querySelector('.map__card.popup');
    rentCard.remove();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var openCardPopup = function (pinButton, rent) {
    var mapFiltersSection = mapSection.querySelector('.map__filters-container');
    var rentCard = mapSection.querySelector('.map__card.popup');
    var activePin = mapSection.querySelector('.map__pin--active');

    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
    pinButton.classList.add('map__pin--active');

    if (rentCard) {
      rentCard.remove();
    }

    rentCard = window.card.renderCard(rent, pinButton.style.left, pinButton.style.top);
    var rentCardClose = rentCard.querySelector('.popup__close');

    rentCardClose.addEventListener('click', function () {
      closeCardPopup();
    });
    rentCardClose.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, closeCardPopup);
    });
    document.addEventListener('keydown', onPopupEscPress);

    mapSection.insertBefore(rentCard, mapFiltersSection);
  };

  var fillPinAddress = function (dividerY) {
    var locationX = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2);
    var locationY = Math.round(mainPin.offsetTop + mainPin.offsetHeight / dividerY);
    pinAddressInput.readOnly = true;
    pinAddressInput.value = '' + locationX + ', ' + locationY;
  };

  var fillPinsListElement = function (rents) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < rents.length; i++) {
      var pinElement = window.pin.renderPin(rents[i]);

      (function (pinButton, rent) {
        pinButton.addEventListener('click', function () {
          openCardPopup(pinButton, rent);
        });
        pinButton.addEventListener('keydown', function (evtPin) {
          window.utils.onEnterEvent(evtPin, function () {
            openCardPopup(pinButton, rent);
          });
        });
      })(pinElement, rents[i]);

      fragment.appendChild(pinElement);
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

    // mapSection.insertBefore(window.card.renderCard(rentsList[0]), mapSection.querySelector('.map__filters-container'));

    PageActive = true;
  };

  window.utils.disableFormFields(mapFiltersForm, true);
  window.utils.disableFormFields(rentForm, true);
  fillPinAddress(2);

  mainPin.addEventListener('mousedown', function () {
    if (!PageActive) {
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
