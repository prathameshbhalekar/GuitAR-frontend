import actions from './../actions/index'

const initialState = {
    user : null
}

const isLoggedInReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions
        .ADD_USER :
            return {
                ...state,
                user : action.user
            }
        case actions
        .REMOVE_USER:
            return {
                ...state,
                user : null
            }
        default:
            return state
    }
}

export default isLoggedInReducer