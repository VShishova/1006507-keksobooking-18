'use strict';

(function () {
  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var rentPhotoChooser = document.querySelector('#images');
  var similarRentPhotoPreview = document.querySelector('.ad-form__photo');
  var rentPhotoContainer = document.querySelector('.ad-form__photo-container');

  var avatarPicture = avatarPreview.src;

  var renderPhotoPreviewElement = function () {
    var newPreviewElement = similarRentPhotoPreview.cloneNode();
    newPreviewElement.classList.add('ad-form__photo--added');
    newPreviewElement.innerHTML = '<img src="" class = "" alt="Фотография жилья" width="100%" height="100%">';
    rentPhotoContainer.insertBefore(newPreviewElement, similarRentPhotoPreview);

    return newPreviewElement;
  };

  var loadFiles = function (filesList, loadHandler) {
    for (var i = 0; i < filesList.length; i++) {
      var fileName = filesList[i].name.toLowerCase();

      var matches = window.config.PICTURE_FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          loadHandler(reader.result);
        });
        reader.readAsDataURL(filesList[i]);
      }
    }
  };

  var deletePictures = function () {
    avatarPreview.src = avatarPicture;
    window.map.rentForm.querySelectorAll('.ad-form__photo--added').forEach(function (el) {
      el.remove();
    });
  };

  avatarChooser.addEventListener('change', function () {
    loadFiles(avatarChooser.files, function (imageText) {
      avatarPreview.src = imageText;
    });
  });

  rentPhotoChooser.addEventListener('change', function () {
    loadFiles(rentPhotoChooser.files, function (imageText) {
      var previewElement = renderPhotoPreviewElement();
      previewElement.querySelector('img').src = imageText;
    });
  });

  window.pictures = {
    deletePictures: deletePictures
  };
})();
