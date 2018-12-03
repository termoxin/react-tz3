import { NEW_USER } from '../constants/api'
import { 
	NEW_USER_SUCCESS, 
	NEW_USER_FAILURE
} from '../constants/action-types'
import { checkResponse } from '../helpers/network'
import axios from 'axios'

export const newUserSuccess = () => ({
	type: NEW_USER_SUCCESS
})

export const newUserFailure = error => ({
	type: NEW_USER_FAILURE,
	payload: error
})

export const registerUser = (name, password, captcha, cb) => {
	return async dispatch => {
		try {
			let response = await axios.post(NEW_USER, {
				username: name,
				password,
				"g-recaptcha-response": captcha
			})

			if(checkResponse(response)) {
				dispatch(newUserSuccess())
				cb()
			}
		} catch(err) {
			dispatch(newUserFailure(err.response.data.error))
		}
	}
}