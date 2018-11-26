import React, { Component } from 'react'
import { getFeeds } from '../actions'
import { connect } from 'react-redux'
import NewsList  from './NewsList'
import { Alert } from 'reactstrap'

class NewsContainer extends Component {
	state = {
		fetched: false
	}
	componentDidMount() {
		this.props.getFeeds(() => {
			this.setState({
				fetched: true
			})
		})
	}
    render() {
    	const { news } = this.props

    	const loadingOrError = () => {
    		if(news.error) return (
    			<Alert color="danger">
       				{news.error}
     	 		</Alert>
    		) 
			return (
				<Alert color="warning">Loading...</Alert> 
			)

    	}

       return(
        <div className="news">
            { 
           	this.state.fetched 
            ? 
           	<NewsList news={news.news} />
            :  
            loadingOrError()
        	}
        </div>
       )
    }
}

const mapDispatchToProps = dispatch => ({
	getFeeds: (cb) => dispatch(getFeeds(cb))
})

const mapStateToProps = state => ({
	news: state.news,
	user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(NewsContainer)