'use strict';

(function () {
  var mapFiltersForm = document.querySelector('.map__filters');
  var housingType = mapFiltersForm.querySelector('#housing-type');
  var housingPrice = mapFiltersForm.querySelector('#housing-price');
  var housingRooms = mapFiltersForm.querySelector('#housing-rooms');
  var housingGuests = mapFiltersForm.querySelector('#housing-guests');

  var onFilterInput = function () {
    var filteredRents = filterRents();
    window.utils.deleteRentCard();
    window.map.fillPinsListElement(filteredRents);
  };

  var checkPriceFilter = function (rentPrice, filterPrice) {
    switch (filterPrice) {
      case 'low':
        return rentPrice < 10000;
      case 'middle':
        return rentPrice >= 10000 && rentPrice < 50000;
      default:
        return rentPrice >= 50000;
    }
  };

  var filterRents = function () {
    var filteredRents = window.map.rentsData.filter(function (rent) {
      return rent.offer;
    });

    var filters = new FormData(mapFiltersForm);
    filters.forEach(function (value, key) {
      if (value !== 'any') {
        filteredRents = filteredRents.filter(function (rent) {
          if (key === 'housing-price') {
            return checkPriceFilter(rent.offer.price, value);
          }
          return rent.offer[window.utils.filtersToFields[key]].toString() === value;
        });
      }
    });

    return filteredRents.slice(0, window.utils.MAX_RENTS_NUMBER);
  };

  housingType.addEventListener('input', window.utils.debounce(onFilterInput));
  housingPrice.addEventListener('input', window.utils.debounce(onFilterInput));
  housingRooms.addEventListener('input', window.utils.debounce(onFilterInput));
  housingGuests.addEventListener('input', window.utils.debounce(onFilterInput));

  window.filter = {
    filterRents: filterRents
  };
})();
