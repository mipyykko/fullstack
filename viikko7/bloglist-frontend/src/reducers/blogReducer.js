import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  console.log(action)
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.blogs
  case 'LIKE_BLOG': {
    const likedBlog = action.blog
    const old = state.filter(blog => likedBlog.id !== blog.id)

    return [...old, likedBlog ]
  }
  case 'DELETE_BLOG': {
    return state
  }
  default:
    return state
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      blogs
    })
  }
}

export const likeBlog = (id) => {
  return async (dispatch) => {
    const blog = await blogService.like(id)
    dispatch({
      type: 'LIKE_BLOG',
      blog
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const blog = await blogService.getById(id)
    dispatch({
      type: 'DELETE_BLOG',
      blog
    })
  }
}
export default reducer