import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getANews } from '../actions'
import { Alert } from 'reactstrap'
import { formatDate } from '../../../helpers/date'

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
	render() {
		const article = () => {
			const { feed } = this.props.Anews
			return (
				<div className="article">
					<h1>{feed.title}</h1>
					<span>{feed.creator.displayName} | {formatDate(feed.createDate)}</span>
					<p>{feed.content}</p>
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
	Anews: state.news.Anews
})

const mapDispatchToProps = dispatch => ({
	getANews: (id, cb) => dispatch(getANews(id, cb))
})

export default connect(mapStateToProps, mapDispatchToProps)(Article)