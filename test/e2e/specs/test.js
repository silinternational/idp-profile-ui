// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('div#layout', 5000)
      .assert.elementPresent('header')
      .assert.elementPresent('main')
      .assert.containsText('h1', 'Welcome')
      .assert.elementCount('img', 1)
      .end()
  }
}
