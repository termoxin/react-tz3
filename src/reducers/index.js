import { combineReducers } from 'redux'
import news from '../pages/News'
import loginReducer from './loginReducer'

const reducers = combineReducers({
	news: news.reducer,
	user: loginReducer
})

export default reducers