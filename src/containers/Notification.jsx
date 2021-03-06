import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'reactstrap'
import { connect } from 'react-redux'

class Notification extends Component {
	state = {
		visible: true
	}
	render() {
		const { errorMsg } = this.props
		const alert = () => {
			setTimeout(() => {
				this.setState({
					visible: false
				})
			}, 5000)

			return <Alert color="danger">{this.props.errorMsg}</Alert>
		}

		return(
			<div className="notification">
				{
					errorMsg && this.state.visible ? alert() : ''
				}
			</div>
		)
	}
}

Notification.propTypes = {
	errorMsg: PropTypes.string
}

const mapStateToProps = state => ({
	errorMsg: state.user.error
})

export default connect(mapStateToProps)(Notification)