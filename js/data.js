'use strict';

(function () {
  var requestConstructor = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = window.config.REQUEST_TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === window.utils.SUCCESS_CODE) {
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

    xhr.open('GET', window.config.URL + '/data');
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = requestConstructor(onLoad, onError);

    xhr.open('POST', window.config.URL);
    xhr.send(data);
  };

  window.data = {
    load: load,
    save: save
  };
})();
