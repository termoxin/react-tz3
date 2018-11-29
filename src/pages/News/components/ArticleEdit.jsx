import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { getANews, editFeed, getFeeds } from '../actions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class ArticleEdit extends Component {
	state = {
		title: '',
		text: '',
		fetched: false
	}
	componentDidMount() {
		this.props.getANews(this.props.match.params.id, () => {
			this.setState({
				fetched: true,
				title: this.props.Anews.feed.title,
				text: this.props.Anews.feed.content,
			})
		})
	}
	handleChange = name => event => {
	    this.setState({
	      [name]: event.target.value,
	    });
 	};
 	editFeed = () => {
 		const id    = this.props.Anews.feed._id
 		const token = this.props.user.user.token
 		
 		this.props.editFeed(id, {
 			title: this.state.title,
 			content: this.state.text
 		}, token, () => {
 			this.props.getFeeds(() => {
 				this.props.history.push('/news')
 			})
 		})
 	}
	render() {
		return(
			this.state.fetched 
			? 
				this.props.isAuth 
				?
				<div className="article">
					<Form className="form">
				        <FormGroup>
				          <Label for="title">Title</Label>
				          <Input 
					          type="text" 
					          value={this.state.title} 
					          onChange={this.handleChange('title')}
					          name="title" 
					          id="title" 
					          placeholder="Title..." 
					       />
				        </FormGroup>
				        <FormGroup>
				          <Label for="text">Text</Label>
				          <Input 
					          type="textarea" 
					          name="text" 
					          value={this.state.text}
					          onChange={this.handleChange('text')} 
				          />
				        </FormGroup>
				        <Button color="success" onClick={this.editFeed}>Submit</Button>
			      	</Form>
			 	 </div>
		 	 	:
		 	 	<Redirect to="/news"/>
		 	:
		 	'Loading...'
		)
	}
}

const mapStateToProps = state => ({
	Anews: state.news.Anews,
	isAuth: state.user.isAuth,
	user: state.user
})

const mapDispatchToProps = dispatch => ({
	getANews: (id, cb) => dispatch(getANews(id, cb)),
	editFeed: (id, feed, token, cb) => dispatch(editFeed(id, feed, token, cb)),
	getFeeds: (cb) => dispatch(getFeeds(cb))
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit)