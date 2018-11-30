import React from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '../../../helpers/date'
import { shortString } from '../../../helpers/string'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteFeed, getFeeds } from '../actions'
import { Card, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap'
import * as FontAwesome from 'react-icons/fa'

export const CardItem = (props) => {
	const isAuthor = () => {
		const { isAuth, user, creator } = props

		if(isAuth && user.user.givenName === creator.split(' ')[0]) {
			return true
		}
		return false
	}
	const deleteOne = () => {
		const { deleteFeed, id, user } = props

		deleteFeed(id, user.token, () => {
			props.getFeeds(() => {
				console.log('%c Deleted successfully!', 'font-weight:700; color: red')
			})
		})
	}

	const { id, title, creator, date, text } = props

	return (
		<div className="col-md-4 col-sm-6">
			<Card style={{ marginTop: 10, height: '95%', width: '100%' }} >
			    <CardBody>
			      <CardTitle>
			      	<Link to={'/news/' + id}>{title}</Link>
			      </CardTitle>
			      	<CardSubtitle><b>{creator}</b> | Created {formatDate(date)}</CardSubtitle>
			      <CardText>{shortString(text)}</CardText>
			    </CardBody>
			    {
			    	isAuthor() 
			    	&&
			    	<div>
			    		<FontAwesome.FaMinusCircle 
				    		className="icon icon-delete" 
				    		onClick={deleteOne}
			    		/>
			    		<Link to={`/news/${id}/edit`}>
			    			<FontAwesome.FaEdit className="icon icon-edit" />
			    		</Link>
			    	</div> 
			    }
		 	 </Card>
		</div>
	)
}


CardItem.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	text: PropTypes.string,
	creator: PropTypes.string,
	date: PropTypes.string,
	deleteFeed: PropTypes.func,
	getFeeds: PropTypes.func
}

const mapStateToProps = state => ({
	user: state.user,
	isAuth: state.user.isAuth
})

const mapDispatchToProps = dispatch => ({
	deleteFeed: (id, token, cb) => dispatch(deleteFeed(id, token, cb)),
	getFeeds: cb => dispatch(getFeeds(cb))
})

export default connect(mapStateToProps, mapDispatchToProps)(CardItem)
