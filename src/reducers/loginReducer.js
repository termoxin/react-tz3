
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
		default: {
			return state
		}
	}
}

export default reducer