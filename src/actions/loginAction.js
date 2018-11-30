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
	return function(dispatch) {
		if(!token) return;

		axios.post(AUTH_URL, {
			token
		})
		.then(response => {
			const { data } = response
			if(checkResponse(response)) {
				dispatch(authSuccess(user, data.token))
			}
		})
		.catch(error => {
			console.log(error)
		}) 
	}
}