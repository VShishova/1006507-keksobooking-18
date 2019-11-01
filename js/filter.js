'use strict';

(function () {
  var filtersFormElement = document.querySelector('.map__filters');
  var selectFields = Array.from(filtersFormElement.querySelectorAll('select'));
  var features = Array.from(filtersFormElement.querySelectorAll('[name=features]'));

  var onFilterInput = function () {
    var filteredRents = filterRents();
    window.utils.deleteRentCard();
    window.map.fillPinsList(filteredRents);
  };

  var checkPriceFilter = function (rentPrice, filterPrice) {
    var priceValue = window.utils.pricesToValues[filterPrice];
    if (priceValue.max) {
      return rentPrice >= priceValue.min && rentPrice < priceValue.max;
    } else {
      return rentPrice >= priceValue.min;
    }
  };

  var filterRents = function () {
    var filteredRents = window.init.rentsData.filter(function (rent) {
      return !!rent.offer && typeof rent.offer === 'object';
    });

    var filters = new FormData(filtersFormElement);

    filters.forEach(function (value, key) {
      if (value !== 'any') {
        filteredRents = filteredRents.filter(function (rent) {
          if (key === 'housing-price') {
            return checkPriceFilter(rent.offer.price, value);
          }
          var dataFieldName = window.utils.filtersToFields[key];
          if (typeof rent.offer[dataFieldName] === 'object' && rent.offer[dataFieldName].length > 0) {
            return rent.offer[dataFieldName].includes(value);
          } else {
            return rent.offer[dataFieldName].toString() === value;
          }
        });
      }
    });

    return filteredRents.slice(0, window.config.MAX_RENTS_NUMBER);
  };

  features.concat(selectFields).forEach(function (elem) {
    elem.addEventListener('input', window.utils.debounce(onFilterInput));
  });

  window.filter = {
    filtersFormElement: filtersFormElement,
    filterRents: filterRents
  };
})();
