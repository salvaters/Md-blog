// tests/unit/Book3D.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Book3D from '@/components/motion/3dBook/Book.vue'

describe('Book3D', () => {
  it('应该根据size属性正确设置样式', () => {
    const wrapper = mount(Book3D, {
      props: {
        title: '测试书籍',
        description: '测试描述',
        category: 'JavaScript',
        size: 'lg'
      }
    })

    const bookElement = wrapper.find('.book-3d')
    expect(bookElement.attributes('style')).toContain('width: 260px')
    expect(bookElement.attributes('style')).toContain('height: 320px')
  })

  it('应该在鼠标悬停时应用正确的变换', async () => {
    const wrapper = mount(Book3D, {
      props: {
        title: '测试书籍',
        description: '测试描述',
        category: 'JavaScript'
      }
    })

    const bookElement = wrapper.find('.book-3d')
    await bookElement.trigger('mouseenter')

    expect(bookElement.classes()).toContain('book-3d-hover')
  })

  it('应该支持自定义渐变色', () => {
    const customGradient = 'linear-gradient(135deg, #ff0000, #00ff00)'
    const wrapper = mount(Book3D, {
      props: {
        title: '测试书籍',
        description: '测试描述',
        category: 'JavaScript',
        gradient: customGradient
      }
    })

    const coverElement = wrapper.find('.book-cover')
    expect(coverElement.attributes('style')).toContain(customGradient)
  })
})
