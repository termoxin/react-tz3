import axios from 'axios';
import { GET_FEEDS } from '../../../constants/api.js';
import { 
	GET_NEWS, 
	GET_NEWS_FAILURE,
} from '../actionTypes';
import { checkResponse } from '../../../helpers/network';

export const getSuccess = feeds => ({
	type: GET_NEWS,
	payload: feeds
})

export const getFailure = error => ({
	type: GET_NEWS_FAILURE,
	payload: error
})

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