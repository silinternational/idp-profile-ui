import Vue from 'vue';

const api = {
  fake: response =>
    new Promise(resolve =>
      setTimeout(() => {
        resolve(response);
      }, 500)
    )
};

Vue.use(theVue => {
  theVue.prototype.$API = api;
});

export default api;
