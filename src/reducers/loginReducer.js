
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
		default: {
			return state
		}
	}
}

export default reducer