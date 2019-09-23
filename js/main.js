'use strict';

var RentTypes = ['palace', 'flat', 'house', 'bungalo'];
var CheckTimes = ['12:00', '13:00', '14:00'];
var Features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var MAX_PRICE = 600;
var MAX_ROOMS = 6;
var MAX_GUESTS = 10;

var APPARTMENTS_AMOUNT = 8;
var PHOTOS_AMOUNT = 15;

var mapSection = document.querySelector('.map');
mapSection.classList.remove('map--faded');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var similarListElement = mapSection.querySelector('.map__pins');

var LOC_MAX_X = similarListElement.offsetWidth;
var LOC_MIN_Y = 130;
var LOC_MAX_Y = 600;

var generatePhotos = function (arraySize) {
  var arr = [];
  for (var i = 1; i <= arraySize; i++) {
    arr.push('http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg');
  }
  return arr;
};

var Photos = generatePhotos(PHOTOS_AMOUNT);

var getRandomElement = function (arr) {
  var randomElement = Math.floor(Math.random() * arr.length);
  return arr[randomElement];
};

var getRandomList = function (arr) {
  var newArr = [];
  var maxElements = Math.floor(Math.random() * arr.length);

  for (var i = 0; i < maxElements; i++) {
    var randomElement = getRandomElement(arr);
    if (!(newArr.includes(randomElement))) {
      newArr.push(randomElement);
    }
  }

  return newArr;
};

var renderRents = function () {
  var rents = [];

  for (var i = 1; i <= APPARTMENTS_AMOUNT; i++) {
    var locationX = Math.round(Math.random() * LOC_MAX_X);
    var locationY = Math.round(LOC_MIN_Y + Math.random() * (LOC_MAX_Y - LOC_MIN_Y));

    var rentsElement = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: 'Предложение ' + i,
        address: '' + locationX + ', ' + locationY,
        price: Math.round(Math.random() * MAX_PRICE),
        type: getRandomElement(RentTypes),
        rooms: Math.round(Math.random() * MAX_ROOMS),
        guests: Math.round(Math.random() * MAX_GUESTS),
        checkin: getRandomElement(CheckTimes),
        checkout: getRandomElement(CheckTimes),
        features: getRandomList(Features),
        description: 'Описание ' + i,
        photos: getRandomList(Photos)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };

    rents.push(rentsElement);
  }

  return rents;
};

var renderPin = function (rent) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style = 'left: ' + (rent.location.x - pinElement.children[0].width / 2) + 'px; top: ' + (rent.location.y - pinElement.children[0].height) + 'px';

  var pinElementImage = pinElement.querySelector('img');
  pinElementImage.src = rent.author.avatar;
  pinElementImage.alt = rent.offer.title;

  return pinElement;
};

var fillListElement = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPin(arr[i]));
  }
  similarListElement.appendChild(fragment);
};

fillListElement(renderRents());
