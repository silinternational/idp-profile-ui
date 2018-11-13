init();

export default {
  key: () => get('key'),
  authzHeader: () => `${get('token_type')} ${get('key') + get('access_token')}`
};

function init() {
  sessionStorage.setItem('key', get('key') || createKey());
  sessionStorage.setItem('token_type', get('token_type') || 'Bearer');
  sessionStorage.setItem('access_token', get('access_token') || '');

  //TODO: should I go ahead and "clear" location.search or will that cause problems if there are other qs params?
}

function createKey() {
  const key = Math.random() // doesn't need to be cryptographically strong
    .toString(36) // convert to base-36 so we get more letters
    .substring(2); // strip off the leading '0.'

  sessionStorage.setItem('key', key);

  return key;
}

function get(key) {
  // TODO: currently no IE support for URLSearchParams (https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams#Browser_compatibility)
  // check this out for further info:  https://developers.google.com/web/updates/2016/01/urlsearchparams
  // polyfill if needed (https://github.com/jerrybendy/url-search-params-polyfill) or the WebReflection one...
  const params = new URLSearchParams(location.search);

  return sessionStorage.getItem(key) || params.get(key);
}

//TODO: is there a need to "clear" sessionStorage, e.g., logout perhaps?
