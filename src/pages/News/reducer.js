
function reducer(state={
	news: null
}, action) {
	switch(action.type) {
		case "GET_NEWS": {
			return {...state, news: action.payload}
		}
		case "GET_A_NEWS": {
			return {...state, Anews: action.payload}
		}
		default: {
			return state
		}
	}
}

export default reducer