import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getANews } from '../actions'
import { Alert } from 'reactstrap'
import { formatDate } from '../../../helpers/date'
import { Button } from 'reactstrap'
import * as FontAwesome from 'react-icons/fa'

class Article extends Component {
	constructor(props) {
		super(props)
		this.state = {
			fetched: false
		}
	} 
	componentDidMount() {
		this.props.getANews(this.props.match.params.id, () => {
			this.setState({
				fetched: true
			})
		})
	}
	isAuthor = (creator) => {
		const { isAuth, user } = this.props
		if(isAuth && user.user.user.givenName === creator.split(' ')[0]) return true
		return false
	}
	render() {
		const article = () => {
			const { feed } = this.props.Anews
			return (
				<div className="article">
					<h1>{feed.title}</h1>
					<span>{feed.creator.displayName} | {formatDate(feed.createDate)}</span>
					<p>{feed.content}</p>
					<div className="controls">
						{
							this.isAuthor(feed.creator.displayName)
							&& 
							<div>
								<Button color="warning">
									<FontAwesome.FaEdit /> Edit
								</Button>
								<Button color="danger">
									<FontAwesome.FaTrash /> Delete
								</Button>
							</div>
						}
						
					</div>
				</div>
			)
		}

		return(
			<div>
				{this.state.fetched ? article() : <Alert color="warning">Loading...</Alert> }
			</div>
		)
	}
}

const mapStateToProps = state => ({
	Anews: state.news.Anews,
	user: state.user,
	isAuth: state.user.isAuth
})

const mapDispatchToProps = dispatch => ({
	getANews: (id, cb) => dispatch(getANews(id, cb))
})

export default connect(mapStateToProps, mapDispatchToProps)(Article)