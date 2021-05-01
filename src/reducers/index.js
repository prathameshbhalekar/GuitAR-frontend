import isLoggedInReducer from './isLoggedin'
import Search from './search'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    isLoggedIn : isLoggedInReducer,
    searchReducer : Search,
})

export default allReducers