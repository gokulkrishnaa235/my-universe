import { DO_SEARCH, GET_DETAILS, CLEAR_SEARCH, UPDATE_LOGIN_STATUS, ENABLE_LOADER } from './constants';


const initialState = {
    searchResult : [],
    Details: {},
    isLoggedIn: false,
    isPrevilageUSer: false,
    userName: ''
};

export const searchReducer = ( state = initialState, action ) => {

    switch(action.type) {
        case DO_SEARCH:
            return {
                ...state,
                searchResult: action.payload,
                Details:{}
            }
        case GET_DETAILS:
            return {
                ...state,
                Details: action.payload
            }  
        case CLEAR_SEARCH:  
            return {
                ...state,
                searchResult: []
            }
        case UPDATE_LOGIN_STATUS: {
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                isPrevilageUSer: action.payload.isPrevilageUser,
                userName: action.payload.userName
            }
        }
        default:
            return state         
    }
}
