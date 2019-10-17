'use strict';

(function () {
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var fillPopupFeaturesList = function (featuresListElement, faturesList) {
    while (featuresListElement.firstChild) {
      featuresListElement.removeChild(featuresListElement.firstChild);
    }

    for (var i = 0; i < faturesList.length; i++) {
      featuresListElement.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--' + faturesList[i] + '"></li>');
    }
  };

  var fillPopupPhotosList = function (photosListElement, photosList) {

    var similarPopupPhotoImage = photosListElement.children[0];
    photosListElement.removeChild(similarPopupPhotoImage);

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photosList.length; i++) {
      var photoImageElement = similarPopupPhotoImage.cloneNode(true);
      photoImageElement.src = photosList[i];

      fragment.appendChild(photoImageElement);
    }

    photosListElement.appendChild(fragment);
  };

  var onPopupEscPress = function (rentCard) {
    return function (evt) {
      window.utils.onEscEvent(evt, function () {
        closeCardPopup(rentCard);
      });
    };
  };

  var closeCardPopup = function (rentCard) {
    rentCard.remove();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var renderCard = function (card) {
    var cardElement = similarCardTemplate.cloneNode(true);
    var rentCardClose = cardElement.querySelector('.popup__close');

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';

    cardElement.querySelector('.popup__type').textContent = window.utils.mapTypesToNames(card.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    fillPopupFeaturesList(cardElement.querySelector('.popup__features'), card.offer.features);
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    fillPopupPhotosList(cardElement.querySelector('.popup__photos'), card.offer.photos);
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    rentCardClose.addEventListener('click', function () {
      closeCardPopup(cardElement);
    });
    rentCardClose.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, function () {
        closeCardPopup(cardElement);
      });
    });
    document.addEventListener('keydown', onPopupEscPress(cardElement));

    return cardElement;
  };

  window.card = {
    renderCard: renderCard
  };
})();
