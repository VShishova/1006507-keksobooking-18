'use strict';

(function () {
  var RentTypes = ['palace', 'flat', 'house', 'bungalo'];
  var CheckTimes = ['12:00', '13:00', '14:00'];
  var Features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var MAX_PRICE = 600;
  var MAX_ROOMS = 6;
  var MAX_GUESTS = 10;
  var APPARTMENTS_AMOUNT = 5;
  var PHOTOS_AMOUNT = 6;
  var LOC_MIN_Y = 130;
  var LOC_MAX_Y = 600;

  var generatePhotos = function () {
    var arr = [];
    for (var i = 1; i <= PHOTOS_AMOUNT; i++) {
      arr.push('http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg');
    }
    return arr;
  };

  var renderRents = function (locationMaxX) {
    var rentsList = [];
    var Photos = generatePhotos();

    for (var i = 1; i <= APPARTMENTS_AMOUNT; i++) {
      var locationX = Math.round(Math.random() * locationMaxX);
      var locationY = Math.round(LOC_MIN_Y + Math.random() * (LOC_MAX_Y - LOC_MIN_Y));

      var rentsElement = {
        author: {
          avatar: 'img/avatars/user0' + i + '.png'
        },
        offer: {
          title: 'Предложение ' + i,
          address: '' + locationX + ', ' + locationY,
          price: Math.round(Math.random() * MAX_PRICE),
          type: window.util.getRandomElement(RentTypes),
          rooms: Math.round(Math.random() * MAX_ROOMS),
          guests: Math.round(Math.random() * MAX_GUESTS),
          checkin: window.util.getRandomElement(CheckTimes),
          checkout: window.util.getRandomElement(CheckTimes),
          features: window.util.getRandomList(Features),
          description: 'Описание ' + i,
          photos: window.util.getRandomList(Photos)
        },
        location: {
          x: locationX,
          y: locationY
        }
      };

      rentsList.push(rentsElement);
    }

    return rentsList;
  };

  window.data = {
    rentsList: renderRents(window.pin.pinsListElement.offsetWidth)
  };
})();
