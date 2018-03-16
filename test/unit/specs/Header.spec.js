import { mount } from '@vue/test-utils'
import Header from '@/components/Header'

describe('Header.vue', () => {
  it('should contain correct elements', () => {
    const wrapper = mount(Header)

    expect(wrapper.contains('header')).toBe(true)
    expect(wrapper.contains('img')).toBe(true)
  })
})
