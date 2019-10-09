'use strict';

(function () {
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (rent) {
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.style.left = '' + (rent.location.x - pinElement.children[0].width / 2) + 'px';
    pinElement.style.top = '' + (rent.location.y - pinElement.children[0].height) + 'px';

    var pinElementImage = pinElement.querySelector('img');
    pinElementImage.src = rent.author.avatar;
    pinElementImage.alt = rent.offer.title;

    return pinElement;
  };

  window.pin = {
    renderPin: renderPin
  };
})();
