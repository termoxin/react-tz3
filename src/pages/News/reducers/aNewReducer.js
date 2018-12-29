import { 
	GET_A_NEWS, 
	DELETE_SUCCESS, 
	EDIT_SUCCESS,
	DELETE_FAILURE,
	EDIT_FAILURE 
} from '../actionTypes'

function reducer(state={
	Anew: null
}, action) {
	switch(action.type) {
		case GET_A_NEWS: {
			return action.payload
		}
		case DELETE_SUCCESS: {
			return {...state}
		}
		case DELETE_FAILURE: {
			return {...state, error: action.payload}
		}
		case EDIT_FAILURE: {
			return {...state, error: action.payload}
		}
		case EDIT_SUCCESS: {
			return {...state}
		}
		default: {
			return state
		}
	}
}		

export default reducer