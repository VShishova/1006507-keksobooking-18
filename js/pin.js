'use strict';

(function () {
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var openCardPopup = function (pinButton, rent) {
    var activePin = window.map.mapSection.querySelector('.map__pin--active');

    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
    pinButton.classList.add('map__pin--active');
    window.utils.deleteRentCard();

    var rentCard = window.card.renderCard(rent);
    window.map.mapSection.insertBefore(rentCard, window.map.mapSection.querySelector('.map__filters-container'));
  };

  var renderPin = function (rent) {
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.style.left = '' + (rent.location.x - pinElement.children[0].width / 2) + 'px';
    pinElement.style.top = '' + (rent.location.y - pinElement.children[0].height) + 'px';

    var pinElementImage = pinElement.querySelector('img');
    pinElementImage.src = rent.author.avatar;
    pinElementImage.alt = rent.offer.title;

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
