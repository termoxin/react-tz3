import { combineReducers } from 'redux';
import AnewReducer from './aNewReducer'
import newsReducer from './newsReducer'

const reducers = combineReducers({
	new: AnewReducer,
	news: newsReducer
})

export default reducers