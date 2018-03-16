import { mount } from '@vue/test-utils'
import Welcome from '@/components/Welcome'

describe('Welcome.vue', () => {
  it('should render correct contents', () => {
    const test = mount(Welcome)

    expect(test.find('h1').text())
      .toContain('Welcome')
  })
})
