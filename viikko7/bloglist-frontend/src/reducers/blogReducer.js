import blogService from '../services/blogs'
import { showNotification, showError } from './notificationReducer'

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
    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        blogs
      })
    } catch (exception) {
      const error = exception.response.data.error || 'unknown error'
      console.log(error)
      dispatch({
        type: 'ERROR_INIT_BLOGS',
        error
      })
      dispatch(showError(`Error initializing blogs: ${error}`))
    }
  }
}

export const likeBlog = (id) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.like(id)
      dispatch({
        type: 'LIKE_BLOG',
        blog
      })
      dispatch(showNotification(`Blog '${blog.title}' liked`))
    } catch (exception) {
      const error = exception.response.data || 'unknown error'
      dispatch({
        type: 'ERROR_LIKE_BLOG',
        error
      })
      dispatch(showError(`Error liking blog: ${error}`))
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      const deletedBlog = await blogService.remove(blog)
      dispatch({
        type: 'DELETE_BLOG',
        deletedBlog
      })
      dispatch(showNotification(`Blog ${deletedBlog.title} deleted`))
    } catch (exception) {
      const { error } = exception.response.data
      dispatch({
        type: 'DELETE_BLOG_ERROR',
        error
      })
      dispatch(showError(`Error deleting blog: ${error}`))
    }
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)

      if (!newBlog) {
        throw Error('blog creation failed')
      }
      dispatch({
        type: 'CREATE_BLOG',
        newBlog
      })
      dispatch(showNotification(`Blog '${newBlog.title}' created!`))
    } catch (exception) {
      const { error } = exception.response.data
      dispatch({
        type: 'ERROR_CREATE_BLOG',
        error
      })
      dispatch(showError(`Error creating blog: ${error}`))
    }
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    try {
      const commentedBlog = await blogService.comment(id, comment)

      dispatch({
        type: 'ADD_COMMENT',
        commentedBlog
      })
      dispatch(showNotification(`Comment '${comment}' added`))
    } catch (exception) {
      const { error } = exception.response.data
      dispatch({
        type: 'ERROR_ADD_COMMENT',
        error
      })
      dispatch(showError(`Error adding comment: ${error}`))
    }
  }
}

export default reducer