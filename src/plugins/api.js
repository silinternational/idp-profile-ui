import Vue from 'vue';

const api = {
  fake: async (call, response) => {
    // TODO: remove when done testing
    // eslint-disable-next-line
    console.log(`call: ${call}`);

    return new Promise(resolve =>
      setTimeout(() => {
        resolve(response);
      }, 500)
    );
  }
};

Vue.use(theVue => {
  theVue.prototype.$API = api;
});

export default api;
