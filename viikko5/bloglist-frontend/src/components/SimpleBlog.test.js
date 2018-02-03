import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders title, author and likes', () => {
    const simpleBlog = {
      title: 'title asdfqwerzxcv',
      author: 'authorasdffdf',
      likes: '6666'
    }

    const simpleBlogComponent = shallow(<SimpleBlog blog={simpleBlog} onClick={() => {}} />)
    const titleDiv = simpleBlogComponent.find('.title')

    expect(titleDiv.text()).toContain(simpleBlog.title)
    expect(titleDiv.text()).toContain(simpleBlog.author)

    const likesDiv = simpleBlogComponent.find('.likes')

    expect(likesDiv.text()).toContain(simpleBlog.likes)
  })

  it('registers like', () => {
    const simpleBlog = {
      title: 'title asdfqwerzxcv',
      author: 'authorasdffdf'
    }

    const mockHandler = jest.fn()

    const simpleBlogComponent = shallow(
      <SimpleBlog
        blog={simpleBlog}
        onClick={mockHandler}
      />
    )

    const button = simpleBlogComponent.find('button')

    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toEqual(2)
  })
})