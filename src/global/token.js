init();

export default {
  key: () => sessionStorage.getItem('key'),
  authzHeader() {
    const token_type = sessionStorage.getItem('token_type');
    const access_token = sessionStorage.getItem('access_token');

    return `${token_type} ${this.key()}${access_token}`;
  }
};

function init() {
  // TODO: currently no IE support for URLSearchParams (https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams#Browser_compatibility)
  // check this out for further info:  https://developers.google.com/web/updates/2016/01/urlsearchparams
  // polyfill if needed (https://github.com/jerrybendy/url-search-params-polyfill) or the WebReflection one...
  let params = new URLSearchParams(location.search);

  sessionStorage.setItem('key', sessionStorage.getItem('key') || createKey());
  sessionStorage.setItem('token_type', params.get('token_type') || 'Bearer');
  sessionStorage.setItem('access_token', params.get('access_token') || '');

  //TODO: should I go ahead and "clear" location.search and will that cause problems if there are other qs params?
}

function createKey() {
  const key = Math.random() // doesn't need to be cryptographically strong
    .toString(36) // convert to base-36 so we get more letters
    .substring(2); // strip off the leading '0.'

  sessionStorage.setItem('key', key);

  return key;
}

//TODO: is there a need to "clear" sessionStorage?
