'use strict';

(function () {
  var avatarChooserElement = document.querySelector('#avatar');
  var avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
  var photoChooserElement = document.querySelector('#images');
  var photoPreviewTemplateElement = document.querySelector('.ad-form__photo');
  var photoContainerElement = document.querySelector('.ad-form__photo-container');

  var avatarInitialPicture = avatarPreviewElement.src;

  var renderPhotoPreviewElement = function () {
    var previewElement = photoPreviewTemplateElement.cloneNode();
    previewElement.classList.add('ad-form__photo--added');
    previewElement.innerHTML = '<img src="" class = "" alt="Фотография жилья" width="100%" height="100%">';
    photoContainerElement.insertBefore(previewElement, photoPreviewTemplateElement);

    return previewElement;
  };

  var loadFiles = function (files, onLoad) {
    for (var i = 0; i < files.length; i++) {
      var fileName = files[i].name.toLowerCase();

      var matches = window.config.PICTURE_FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          onLoad(reader.result);
        });
        reader.readAsDataURL(files[i]);
      }
    }
  };

  var deletePictures = function () {
    avatarPreviewElement.src = avatarInitialPicture;
    window.form.rentFormElement.querySelectorAll('.ad-form__photo--added').forEach(function (el) {
      el.remove();
    });
  };

  avatarChooserElement.addEventListener('change', function () {
    loadFiles(avatarChooserElement.files, function (imageText) {
      avatarPreviewElement.src = imageText;
    });
  });

  photoChooserElement.addEventListener('change', function () {
    loadFiles(photoChooserElement.files, function (imageText) {
      var previewElement = renderPhotoPreviewElement();
      previewElement.querySelector('img').src = imageText;
    });
  });

  window.pictures = {
    deletePictures: deletePictures
  };
})();
