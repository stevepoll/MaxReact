import * as actionTypes from '../actions'

const initialState = {
  results: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        results: state.results.concat({ id: new Date(), val: action.result })
      }
    case actionTypes.DELETE_RESULT:
      // const id = 2
      // const newArray = [...state.results]
      // newArray.splice(id, 1)
      const updateArray = state.results.filter(result => result.id !== action.resultId)
      return {
        ...state,
        results: updateArray
      }

  }

  return state
}

export default reducer