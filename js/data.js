'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;
  var SUCCESS_CODE = 200;

  var requestConstructor = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = requestConstructor(onLoad, onError);

    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = requestConstructor(onLoad, onError);

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.data = {
    load: load,
    save: save
  };
})();
