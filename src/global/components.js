import BasePage from './BasePage.vue'
import ButtonBar from './ButtonBar.vue'
import BaseTextField from './BaseTextField.vue'
import Loading from './Loading.vue'

export default (app) => {
  app.component('BasePage', BasePage)
  app.component('ButtonBar', ButtonBar)
  app.component('BaseTextField', BaseTextField)
  app.component('LoadingIndicator', Loading)
}
