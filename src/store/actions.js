
import { DO_SEARCH, GET_DETAILS, CLEAR_SEARCH, UPDATE_LOGIN_STATUS, ENABLE_LOADER} from './constants'

export const doSearch = (param) => {
    return dispatch => {
        fetch(`https://swapi.co/api/planets/?search=${param}`)
            .then (req => req.json())
            .then(response => {
                let resultValue = response.results;
                dispatch ({ type: DO_SEARCH, payload: resultValue })
            })
    }
}


export const getDetails = (url) => {
    return dispatch => {
        fetch(url).then(req => req.json())
        .then(response => {
            dispatch ({ type: GET_DETAILS, payload: response })
        })
    }  
}

export const clearSearch = () => {
    return dispatch => {
            dispatch ({ type: CLEAR_SEARCH})
        }
}  

export const updateLoginStatus = (value) => {
    return dispatch => {
        dispatch ({type: UPDATE_LOGIN_STATUS, payload: value})
    }
}



