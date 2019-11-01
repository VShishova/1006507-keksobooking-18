'use strict';

(function () {
  var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');

  var onPopupEscPress = function (evt) {
    window.utils.onEscEvent(evt, closeCardPopup);
  };

  var closeCardPopup = function () {
    window.utils.deleteRentCard();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var fillPopupFeatures = function (featuresListElement, features) {
    window.utils.deleteListItems(featuresListElement);
    features.forEach(function (el) {
      var feature = '<li class="popup__feature popup__feature--' + el + '"></li>';
      featuresListElement.insertAdjacentHTML('beforeend', feature);
    });
  };

  var fillPopupPhotos = function (photosListElement, photos) {
    var pictureTemplateElement = photosListElement.children[0];
    photosListElement.removeChild(pictureTemplateElement);

    var fragment = document.createDocumentFragment();

    photos.forEach(function (el) {
      var pictureElement = pictureTemplateElement.cloneNode(true);
      pictureElement.src = el;
      fragment.appendChild(pictureElement);
    });

    photosListElement.appendChild(fragment);
  };

  var checkDataField = function (data, fieldName, element) {
    var isCorrect = false;

    if (!!data[fieldName] &&
        (typeof data[fieldName] === 'string' && data[fieldName].length > 0) ||
        (data[fieldName] instanceof Array && data[fieldName].length > 0) ||
        typeof data[fieldName] === 'number') {
      isCorrect = true;
    }

    if (!isCorrect && element) {
      element.remove();
    }

    return isCorrect;
  };

  var renderCard = function (card) {
    var cardElement = cardTemplateElement.cloneNode(true);
    var сardCloseElement = cardElement.querySelector('.popup__close');

    var currentElement = cardElement.querySelector('.popup__title');
    if (checkDataField(card.offer, 'title', currentElement)) {
      currentElement.textContent = card.offer.title;
    }

    currentElement = cardElement.querySelector('.popup__text--address');
    if (checkDataField(card.offer, 'address', currentElement)) {
      currentElement.textContent = card.offer.address;
    }

    currentElement = cardElement.querySelector('.popup__text--price');
    if (checkDataField(card.offer, 'price', currentElement)) {
      currentElement.textContent = card.offer.price + '₽/ночь';
    }

    currentElement = cardElement.querySelector('.popup__type');
    if (checkDataField(card.offer, 'type', currentElement)) {
      currentElement.textContent = window.utils.typesToNames[card.offer.type];
    }

    currentElement = cardElement.querySelector('.popup__text--capacity');
    if (checkDataField(card.offer, 'rooms', currentElement) && checkDataField(card.offer, 'guests', currentElement)) {
      currentElement.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    }

    currentElement = cardElement.querySelector('.popup__text--time');
    if (checkDataField(card.offer, 'checkin', currentElement) && checkDataField(card.offer, 'checkout', currentElement)) {
      currentElement.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    }

    currentElement = cardElement.querySelector('.popup__features');
    if (checkDataField(card.offer, 'features', currentElement)) {
      fillPopupFeatures(currentElement, card.offer.features);
    }

    currentElement = cardElement.querySelector('.popup__description');
    if (checkDataField(card.offer, 'description', currentElement)) {
      currentElement.textContent = card.offer.description;
    }

    currentElement = cardElement.querySelector('.popup__photos');
    if (checkDataField(card.offer, 'photos', currentElement)) {
      fillPopupPhotos(currentElement, card.offer.photos);
    }

    currentElement = cardElement.querySelector('.popup__avatar');
    try {
      currentElement.src = card.author.avatar;
    } catch (err) {
      currentElement.remove();
    }

    сardCloseElement.addEventListener('click', closeCardPopup);
    сardCloseElement.addEventListener('keydown', function (evt) {
      window.utils.onEnterEvent(evt, closeCardPopup);
    });
    document.addEventListener('keydown', onPopupEscPress);

    return cardElement;
  };

  window.card = {
    renderCard: renderCard
  };
})();
