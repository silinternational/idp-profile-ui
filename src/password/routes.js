import Create from './Create'
import Confirm from './Confirm'
import Saved from './Saved'
import Recovery from './Recovery'

export default [
  {
    path: '/password/create',
    component: Create
  },
  {
    path: '/password/confirm',
    component: Confirm
  },
  {
    path: '/password/saved',
    component: Saved
  },
  {
    path: '/password/recovery',
    component: Recovery
  }
]
