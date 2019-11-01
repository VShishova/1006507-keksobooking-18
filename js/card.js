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

    if (data[fieldName] &&
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

    var offerKeys = [
      'title', 'address', 'price', 'photos', 'description', 'features', 'type', 'rooms', 'checkin'
    ];

    var mapToClassName = function (key) {
      switch (key) {
        case 'price':
        case 'address':
        case 'time':
          return '.popup__text--' + key;
        case 'rooms':
          return '.popup__text--capacity';
        case 'checkin':
          return '.popup__text--time';
        default:
          return '.popup__' + key;
      }
    };

    var element;
    var selector;
    var isElementCorrect;

    offerKeys.forEach(function (key) {
      selector = mapToClassName(key);
      element = cardElement.querySelector(selector);
      isElementCorrect = checkDataField(card.offer, key, element);

      if (isElementCorrect) {
        switch (key) {
          case 'photos':
            fillPopupPhotos(element, card.offer[key]);
            break;
          case 'features':
            fillPopupFeatures(element, card.offer[key]);
            break;
          case 'type':
            element.textContent = window.utils.typesToNames[card.offer[key]];
            break;
          case 'price':
            element.textContent = card.offer[key] + '₽/ночь';
            break;
          case 'rooms':
            if (checkDataField(card.offer, 'guests', element)) {
              element.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
            }
            break;
          case 'checkin':
            if (checkDataField(card.offer, 'checkout', element)) {
              element.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
            }
            break;
          default:
            element.textContent = card.offer[key];
        }
      }
    });

    element = cardElement.querySelector('.popup__avatar');
    try {
      element.src = card.author.avatar;
    } catch (err) {
      element.remove();
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
