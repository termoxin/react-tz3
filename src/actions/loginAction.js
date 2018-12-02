import { AUTH_URL } from '../constants/api'
import { AUTH_USER, USER_LOGOUT, AUTH_FAILURE} from '../constants/action-types'
import { checkResponse } from '../helpers/network'
import axios from 'axios'

export const authSuccess = (user, token='') => ({
	type: AUTH_USER,
	payload: {
		user,
		token
	}
})

export const authFailure = error => ({
	type: AUTH_FAILURE,
	payload: error
})

export const logoutUser = () => ({
	type: USER_LOGOUT
})

export const authUser = (user, token) => {
	return async dispatch => {
		try {
			if(!token) return;

			let response = await axios.post(AUTH_URL, { token })

			if(checkResponse(response)) {
				dispatch(authSuccess(user, response.data.token))
			}
		} catch(err) {
			dispatch(authFailure(err))
		}
	}
}