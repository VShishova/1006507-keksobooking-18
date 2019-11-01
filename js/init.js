'use strict';

(function () {
  var mainSectionElement = document.querySelector('main');

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

  var onError = function (errorMessage) {
    var errorElement = window.utils.renderErrorMessage(errorMessage);
    var errorCloseElement = errorElement.querySelector('.error__button');
    errorCloseElement.addEventListener('click', function () {
      closeExchangeMessage('error', onErrorEscPress, onErrorClick);
    });

    mainSectionElement.insertAdjacentElement('afterbegin', errorElement);

    document.addEventListener('keydown', onErrorEscPress);
    document.addEventListener('click', onErrorClick);
  };

  var onSuccessLoad = function (rents) {
    window.utils.disableFormFields(window.filter.filtersFormElement, false);
    window.init.rentsData = rents;

    var filteredRents = window.filter.filterRents();
    window.map.fillPinsList(filteredRents);
  };

  var onSuccessSave = function () {
    var successElement = window.utils.renderSuccessMessage();
    mainSectionElement.insertAdjacentElement('afterbegin', successElement);

    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', onSuccessClick);

    resetData();
    changePageStateInactive();
  };

  var closeExchangeMessage = function (className, onEscPress, onClick) {
    var messageElement = document.querySelector('.' + className);
    messageElement.remove();

    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', onClick);
  };

  var resetData = function () {
    window.form.rentFormElement.reset();
    window.filter.filtersFormElement.reset();
    window.pictures.deletePictures();

    window.utils.deleteRentCard();
    window.utils.deleteMapPins();

    window.map.setStartPinCoords();
    window.map.fillPinAddress(false);
  };

  var changePageStateInactive = function () {
    window.map.mapSectionElement.classList.add('map--faded');
    window.form.rentFormElement.classList.add('ad-form--disabled');
    window.utils.disableFormFields(window.form.rentFormElement, true);
    window.utils.disableFormFields(window.filter.filtersFormElement, true);

    window.init.pageActive = false;
  };

  var changePageStateActive = function () {
    window.data.load(onSuccessLoad, onError);

    window.map.mapSectionElement.classList.remove('map--faded');
    window.form.rentFormElement.classList.remove('ad-form--disabled');
    window.utils.disableFormFields(window.form.rentFormElement, false);

    window.init.pageActive = true;
    window.map.fillPinAddress(true);
  };

  window.init = {
    pageActive: false,
    changePageStateActive: changePageStateActive,
    changePageStateInactive: changePageStateInactive,
    onSuccessSave: onSuccessSave,
    onError: onError,
    resetData: resetData,
    rentsData: []
  };

  changePageStateInactive();
  window.map.fillPinAddress(false);
})();
