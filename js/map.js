'use strict';

(function () {

  var mapSection = document.querySelector('.map');
  var mapFiltersForm = document.querySelector('.map__filters');
  var mainPin = document.querySelector('.map__pin--main');

  var PageActive = false;

  var changePageStateActive = function () {
    if (PageActive) {
      return;
    }

    mapSection.classList.remove('map--faded');
    window.form.rentForm.classList.remove('ad-form--disabled');
    window.util.disableFormFields(window.form.rentForm, false);

    window.pin.fillPinsListElement();
    window.form.fillPinAddress(mainPin, 1);

    window.util.disableFormFields(mapFiltersForm, false);

    // mapSection.insertBefore(window.card.renderCard(window.data.rentsList[0]), mapSection.querySelector('.map__filters-container'));

    PageActive = true;
  };

  window.util.disableFormFields(mapFiltersForm, true);

  mainPin.addEventListener('mousedown', function () {
    changePageStateActive();
  });
  mainPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, changePageStateActive);
  });

  window.map = {
    mainPin: mainPin,
    mapSection: mapSection
  };
})();
