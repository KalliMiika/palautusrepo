
const initialState = ""

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER':
      return action.searchkey
    default: return state
  }
}

export const update = (searchkey) => {
  return {
    type: 'FILTER',
    searchkey: searchkey
  }
}

export default filterReducer