import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import VideoSelector from '../VideoSelector.vue'

describe('VideoSelector', () => {
  it('renders properly', () => {
    const wrapper = mount(VideoSelector, { props: { selected: 'Video 1' } })
    expect(wrapper.text()).toContain('Video 1')
  })
})
