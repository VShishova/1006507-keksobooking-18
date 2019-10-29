'use strict';

(function () {
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var onPopupEscPress = function (evt) {
    window.utils.onEscEvent(evt, closeCardPopup);
  };

  var closeCardPopup = function () {
    window.utils.deleteRentCard();
    document.removeEventListener('keydown', onPopupEscPress);
  };


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

  var renderCard = function (card) {
    var cardElement = similarCardTemplate.cloneNode(true);
    var rentCardClose = cardElement.querySelector('.popup__close');

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';

    cardElement.querySelector('.popup__type').textContent = window.utils.typesToNames[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    fillPopupFeaturesList(cardElement.querySelector('.popup__features'), card.offer.features);
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    fillPopupPhotosList(cardElement.querySelector('.popup__photos'), card.offer.photos);
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    rentCardClose.addEventListener('click', closeCardPopup);
    rentCardClose.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, closeCardPopup);
    });
    document.addEventListener('keydown', onPopupEscPress);

    return cardElement;
  };

  window.card = {
    renderCard: renderCard
  };
})();
