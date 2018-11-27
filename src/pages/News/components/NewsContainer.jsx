import React, { Component } from 'react'
import { getFeeds } from '../actions'
import { connect } from 'react-redux'
import NewsList  from './NewsList'
import { Route, Switch } from 'react-router-dom'
import Article from './Article'
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
    	const { news, user} = this.props

    	const loadingOrError = () => {
    		if(user.error) return (
    			<Alert color="danger">
       				{user.error}
     	 		</Alert>
    		) 
			return (
				<Alert color="warning">Loading...</Alert> 
			)

    	}

       return(
        <div className="news">
            <Switch>
              <Route path="/news/:id" component={Article}/>
              <Route path="/news/:id/edit" />
              { 
                this.state.fetched 
                ? 
                <NewsList news={news.news} />
                :  
                loadingOrError()
              }
            </Switch>
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