
function reducer(state = {
	isAuth: false
}, action) {
	switch(action.type) {
		case "AUTH_USER": {
			return {...state, user: action.payload, isAuth: true}
		}
		case "USER_LOGOUT": {
			return {...state, isAuth: false, user: null}
		}
		case "GET_NEWS_FAILURE": {
			return {...state, error: action.payload}
		}
		case "DELETE_FAILURE": {
			return {...state, error: action.payload}
		}
		case "EDIT_FAILURE": {
			return {...state, error: action.payload}
		}
		case "AUTH_FAILURE": {
			return {...state, error: action.payload}
		}
		case "NEW_USER_FAILURE": {
			return {...state, error: action.payload}
		}
		case "AUTH_USER_WITH_PASSWORD_FAILURE": {
			return {...state, error: action.payload}
		}
		case "AUTH_USER_WITH_PASSWORD_SUCCESS": {
			return {...state, user: 
				{token: action.payload.token, 
					user: {givenName: action.payload.givenName }}, isAuth: true}
		}
		default: {
			return state
		}
	}
}

export default reducer