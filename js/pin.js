'use strict';

(function () {
  var pinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');

  var openCardPopup = function (pinElement, rent) {
    var activePinElement = window.map.mapSectionElement.querySelector('.map__pin--active');

    if (activePinElement) {
      activePinElement.classList.remove('map__pin--active');
    }
    pinElement.classList.add('map__pin--active');
    window.utils.deleteRentCard();

    var rentCardElement = window.card.renderCard(rent);
    window.map.mapSectionElement.insertBefore(rentCardElement, window.map.mapSectionElement.querySelector('.map__filters-container'));
  };

  var renderPin = function (rent) {
    var pinElement = pinTemplateElement.cloneNode(true);

    pinElement.style.left = '' + (rent.location.x - pinElement.children[0].width / 2) + 'px';
    pinElement.style.top = '' + (rent.location.y - pinElement.children[0].height) + 'px';

    var pinImageElement = pinElement.querySelector('img');
    pinImageElement.src = rent.author.avatar;
    pinImageElement.alt = rent.offer.title;

    pinElement.addEventListener('click', function () {
      openCardPopup(pinElement, rent);
    });
    pinElement.addEventListener('keydown', function (evt) {
      window.utils.onEnterEvent(evt, function () {
        openCardPopup(pinElement, rent);
      });
    });

    return pinElement;
  };

  window.pin = {
    renderPin: renderPin
  };
})();
