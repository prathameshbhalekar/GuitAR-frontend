import actions from './../actions/index'

const initialState = {
    pageNumber : 1,
    query : ''
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {

    case actions.CHANGE_SEARCH_PAGE:
        return { ...state, pageNumber : action.pageNumber }
    
    case actions.CHANGE_SEARCH_TEXT:
        return {...state, query : action.query}
    
    case actions.INCREMENT_SEARCH_PAGE:
        return {...state, pageNumber : state.pageNumber + 1}

    default:
        return state
    }
}

export default searchReducer
