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
		if(props.isAuth && props.user.user.user.givenName === props.creator.split(' ')[0]) {
			return true
		}
		return false
	}
	const deleteOne = () => {
		props.deleteFeed(props.id, props.user.user.token, () => {
			props.getFeeds(() => {
				console.log('%c Deleted successfully!', 'font-weight:700; color: red')
			})
		})
	}
	return (
		<div className="col-md-4 col-sm-6">
			<Card style={{ marginTop: 10, height: '95%', width: '100%' }} >
			    <CardBody>
			      <CardTitle>
			      	<Link to={'/news/' + props.id}>{props.title}</Link>
			      </CardTitle>
			      	<CardSubtitle><b>{props.creator}</b> | Created {formatDate(props.date)}</CardSubtitle>
			      <CardText>{shortString(props.text)}</CardText>
			    </CardBody>
			    {
			    	isAuthor() 
			    	&&
			    	<div>
			    		<FontAwesome.FaMinusCircle 
				    		className="icon icon-delete" 
				    		onClick={deleteOne}
			    		/>
			    		<Link to={`/news/${props.id}/edit`}>
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
