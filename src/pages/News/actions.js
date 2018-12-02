import axios from 'axios'
import { GET_FEEDS, API_URL } from '../../constants/api.js'
import { 
	GET_NEWS, 
	GET_NEWS_FAILURE, 
	GET_A_NEWS, 
	GET_A_NEWS_FAILURE,
	DELETE_FAILURE,
	DELETE_SUCCESS,
	EDIT_SUCCESS,
	EDIT_FAILURE
} from './actionTypes'
import { checkResponse } from '../../helpers/network'

export const getSuccess = feeds => ({
	type: GET_NEWS,
	payload: feeds
})

export const getFailure = error => ({
	type: GET_NEWS_FAILURE,
	payload: error
})

export const getANewsSuccess = Anews => ({
	type: GET_A_NEWS,
	payload: Anews
}) 

export const getANewsFailure = error => ({
	type: GET_A_NEWS_FAILURE,
	payload: error
})

export const deleteSuccess = () => ({
	type: DELETE_SUCCESS
})

export const deleteFailure = error => ({
	type: DELETE_FAILURE,
	payload: error
})

export const editSuccess = () => ({
	type: EDIT_SUCCESS
})

export const editFailure = error => ({
	type: EDIT_FAILURE,
	payload: error
})

export const getANews = (id, cb) => {
	return async dispatch => {
		try {
			let response = await axios(GET_FEEDS + `/${id}`)

			if(checkResponse(response)) {
				dispatch(getANewsSuccess(response.data))
				cb()
			}
		} catch(err) {
			dispatch(getANewsFailure(err.message))
		}
	}
}

export const getFeeds = cb => {
	return async dispatch => {
		try {
			let response = await axios(GET_FEEDS)

			if(checkResponse(response)) {
				dispatch(getSuccess(response.data.feeds))
				cb()
			}
		} catch(err) {
			dispatch(getFailure(err.message))
		}
	}
}

export const deleteFeed = (id, token, cb) => {
	return async dispatch => {
		try {
			let response = await axios.delete(API_URL + `/feeds/${id}`, {
				headers: {
					'x-access-token': token
				}
			})
			if(checkResponse(response)) {
				dispatch(deleteSuccess(response))
				cb()
			}
		} catch(err) {
			dispatch(deleteFailure(err.message))
		}
	}
}

export const editFeed = (id, feed, token, cb) => {
	return async dispatch => {
		try {
			let response = await axios(API_URL + `/feeds/${id}`, {
				method: 'PUT',
				data: feed,
				headers: {'x-access-token': token }
			})
			if(checkResponse(response)) {
				dispatch(editSuccess(response))
				cb()
			}
		} catch(err) {
			dispatch(editFailure(err.message))
		}
	}
}