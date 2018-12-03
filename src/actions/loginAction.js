import { AUTH_URL, 	AUTH_USER_WITH_PASSWORD } from '../constants/api'
import { 
	AUTH_USER, 
	USER_LOGOUT, 
	AUTH_FAILURE,
	AUTH_USER_WITH_PASSWORD_SUCCESS,
	AUTH_USER_WITH_PASSWORD_FAILURE
} from '../constants/action-types'
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

export const authSuccessWithPassword = (username, token) => ({
	type: AUTH_USER_WITH_PASSWORD_SUCCESS,
	payload: {
		token,
		givenName: username
	}
})

export const authFailureWithPassword = error => ({
	type: AUTH_USER_WITH_PASSWORD_FAILURE,
	payload: error
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
			dispatch(authFailure(err.message))
		}
	}
}

export const authUserWithPassword = (username, password, cb) => {
	return async dispatch => {
		try {
			let response = await axios.post(AUTH_USER_WITH_PASSWORD, {
				username,
				password
			})

			if(checkResponse(response)) {
				dispatch(authSuccessWithPassword(username, response.data.token))
				cb()
			}
		} catch(err) {
			dispatch(authFailureWithPassword(err.response.data.error))
		}
	}
}