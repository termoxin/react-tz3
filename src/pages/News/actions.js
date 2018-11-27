import axios from 'axios'
import { GET_FEEDS } from '../../constants/api.js'
import { 
	GET_NEWS, 
	GET_NEWS_FAILURE, 
	GET_A_NEWS, 
	GET_A_NEWS_FAILURE 
} from './actionTypes'
import { checkResponse } from '../../helpers/network'

export const getSuccess = (feeds) => ({
	type: GET_NEWS,
	payload: feeds
})

export const getFailure = (error) => ({
	type: GET_NEWS_FAILURE,
	payload: error
})

export const getANewsSuccess = (Anews) => ({
	type: GET_A_NEWS,
	payload: Anews
}) 

export const getANewsFailure = (error) => ({
	type: GET_A_NEWS_FAILURE,
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