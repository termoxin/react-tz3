import axios from 'axios'
import { GET_FEEDS, API_URL } from '../../constants/api.js'
import { 
	GET_NEWS, 
	GET_NEWS_FAILURE, 
	GET_A_NEWS, 
	GET_A_NEWS_FAILURE,
	DELETE_FAILURE,
	DELETE_SUCCESS
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

export const getANews = (id, cb) => {
	return function(dispatch) {
		axios(GET_FEEDS + `/${id}`)
			.then(response => {
				if(checkResponse(response)) {
					dispatch(getANewsSuccess(response.data))
					cb()
				}
			})
			.catch(error => dispatch(getANewsFailure(error)))
	}
}

export const getFeeds = (cb) => {
	return function(dispatch) {
		axios(GET_FEEDS)
			.then(response => {
				if(checkResponse(response)) {
					dispatch(getSuccess(response.data.feeds))
					cb()
				}
			})
			.catch(error => dispatch(getFailure(error.message)))
	}
}

export const deleteFeed = (id, token, cb) => {
	return function(dispatch) {
		axios.delete(API_URL + `/feeds/${id}`, {
			headers: {
				'x-access-token': token
			}
		})
		.then(response => {
			if(checkResponse(response)) {
				dispatch(deleteSuccess(response))
				cb()
			}
		})
		.catch(error => dispatch(deleteFailure(error.message)))
	}
}