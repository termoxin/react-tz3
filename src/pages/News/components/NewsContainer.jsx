import React, { Component } from 'react'
import { getFeeds } from '../actions'
import PrivateRoute from '../../../components/PrivateRoute'
import { connect } from 'react-redux'
import NewsList  from './NewsList'
import { Route, Switch } from 'react-router-dom'
import Article from './Article'
import ArticleEdit from './ArticleEdit'
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

       return(
        <div className="news">
            <Switch>
              <Route exact path="/news/:id" component={Article}/>
              <Route exact path="/news/:id/edit">
                <PrivateRoute component={ArticleEdit}/>
              </Route>
              <Route path="/news" render={() => (
                this.state.fetched 
                ? 
                <NewsList news={news.news} />
                :  
                <Alert color="warning">Loading...</Alert> 
              )}/>
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