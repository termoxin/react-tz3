import React from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '../../../helpers/date'
import { connect } from 'react-redux'
import { Card, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap'
import * as FontAwesome from 'react-icons/fa'

export const CardItem = (props) => {
	const isAuthor = () => {
		if(props.isAuth && props.user.user.user.givenName === props.creator.split(' ')[0]) return true
		return false
	}
	return (
		<div className="col-md-4">
			<Card style={{ marginTop: 10 }}>
			    <CardBody>
			      <CardTitle>{props.title}</CardTitle>
			      	<CardSubtitle><b>{props.creator}</b> | Created {formatDate(props.date)}</CardSubtitle>
			      <CardText>{props.text}</CardText>
			    </CardBody>
			    {
			    	isAuthor() 
			    	&&
			    	<div>
			    		<FontAwesome.FaMinusCircle className="icon-delete" />
			    		<FontAwesome.FaEdit className="icon-edit" />
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
	date: PropTypes.string
}

const mapStateToProps = state => ({
	user: state.user,
	isAuth: state.user.isAuth
})

export default connect(mapStateToProps)(CardItem)