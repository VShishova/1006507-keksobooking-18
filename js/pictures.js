'use strict';

(function () {
  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var rentPhotoChooser = document.querySelector('#images');
  // var similarRentPhotoPreview = document.querySelector('.ad-form__photo');
  // var rentPhotoContainer = document.querySelector('.ad-form__photo-container');

  // var renderPhotoPreviewElement = function () {
  //   var newPreviewElement = similarRentPhotoPreview.cloneNode();
  //   newPreviewElement.classList.add('.ad-form__photo--added');
  //   newPreviewElement.innerHTML = '<img src="" class = "" alt="Фотография жилья" width="100%" height="auto">';
  //   rentPhotoContainer.insertBefore(newPreviewElement, similarRentPhotoPreview);

  //   return newPreviewElement;
  // };

  var loadFiles = function (filesList, loadHandler) {
    for (var i = 0; i < filesList.length; i++) {
      var fileName = filesList[i].name.toLowerCase();

      var matches = window.config.PICTURE_FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', loadHandler);
        reader.readAsDataURL(filesList[i]);
      }
    }
  };

  avatarChooser.addEventListener('change', function () {
    loadFiles(avatarChooser.files, function () {
      // var reader = new FileReader();
    });
    // var files = avatarChooser.files;
    // for (var i = 0; i < files.length; i++) {
    //   var fileName = files[i].name.toLowerCase();

    //   var matches = window.config.PICTURE_FILE_TYPES.some(function (it) {
    //     return fileName.endsWith(it);
    //   });

    //   if (matches) {
    //     var reader = new FileReader();

    //     reader.addEventListener('load', function () {
    //       avatarPreview.src = reader.result;
    //     });

    //     reader.readAsDataURL(files[i]);
    //   }
    // }
  });

  rentPhotoChooser.addEventListener('change', function () {
    var files = rentPhotoChooser.files;
    for (var i = 0; i < files.length; i++) {
      var fileName = files[i].name.toLowerCase();

      var matches = window.config.PICTURE_FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          avatarPreview.src = reader.result;
        });

        reader.readAsDataURL(files[i]);
      }
    }
  });
})();
