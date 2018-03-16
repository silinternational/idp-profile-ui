import { mount } from '@vue/test-utils'
import App from '@/App'

describe('App.vue', () => {
  it('should contain correct elements', () => {
    const wrapper = mount(App, {
      stubs: ['router-link', 'router-view']
    })

    expect(wrapper.contains('header')).toBe(true)
    expect(wrapper.contains('main')).toBe(true)
  })
})
