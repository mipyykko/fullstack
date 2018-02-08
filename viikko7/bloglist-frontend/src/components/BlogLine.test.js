import React from 'react'
import { shallow } from 'enzyme'
import BlogLine from './BlogLine'

describe.only('<BlogLine />', () => {
  let blogComponent, blog

  beforeEach(() => {
    blog = {
      title: 'ashhsdf pxvxc',
      author: 'otvsfdf äöäö',
      url: 'http://psds.ööö',
      likes: '666',
      user: { name: 'ffff' }
    }

    blogComponent = shallow(
      <BlogLine
        blog={blog}
        deletable={true}
      />
    )
  })

  it('renders title and author', () => {
    const titleDiv = blogComponent.find('.title')

    expect(titleDiv.text()).toContain(blog.title)
    expect(titleDiv.text()).toContain(blog.author)
  })

  it('details are not displayed at first', () => {
    const detailsDiv = blogComponent.find('.details')

    expect(detailsDiv.getElement().props.style).toEqual({ display: 'none' })
  })

  it('details are displayed after click', () => {
    const titleDiv = blogComponent.find('.title')
    titleDiv.simulate('click')

    const detailsDiv = blogComponent.find('.details')
    expect(detailsDiv.getElement().props.style).toEqual({ display: '' })
    expect(detailsDiv.text()).toContain(blog.url)
    expect(detailsDiv.text()).toContain(blog.user.name)
    expect(detailsDiv.text()).toContain('delete')
  })
})