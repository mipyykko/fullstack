const initialState = ''

const reducer = (store = initialState, action) => {
  if (action.type === 'UPDATE_FILTER') {
    return action.filter
  }
  if (action.type === 'RESET_FILTER') {
    return ''
  }

  return store
}

export const updateFilter = (filter) => {
  return {
    type: 'UPDATE_FILTER',
    filter
  }
}

export const resetFilter = () => {
  return {
    type: 'RESET_FILTER',
  }
}

export default reducer