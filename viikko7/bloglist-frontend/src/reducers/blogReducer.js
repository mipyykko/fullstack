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
    const { deletedBlog } = action
    return state.filter(blog => deletedBlog.id !== blog.id)
  }
  case 'CREATE_BLOG' : {
    return [...state, action.newBlog ]
  }
  case 'ADD_COMMENT' : {
    const { commentedBlog } = action
    const old = state.filter(blog => commentedBlog.id !== blog.id)

    return [...old, commentedBlog ]
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
    const deletedBlog = await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      deletedBlog
    })
  }
}

export const createBlog = (title, author, url) => {
  return async (dispatch) => {
    const newBlog = await blogService.create({
      title: title,
      author: author,
      url: url
    })

    dispatch({
      type: 'CREATE_BLOG',
      newBlog
    })
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const commentedBlog = await blogService.comment(id, comment)

    dispatch({
      type: 'ADD_COMMENT',
      commentedBlog
    })
  }
}

export default reducer