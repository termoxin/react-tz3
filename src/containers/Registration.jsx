import React, { Component } from 'react'
import ReCAPTCHA from "react-google-recaptcha"
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { registerUser } from '../actions/registerAction'
import { validatePassword, validateUsername } from '../helpers/validators'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

class Registration extends Component {
	constructor(props) {
		super(props)

		this.state = {
			username: '',
			password: '',
			isValidate: false
		}

		this.recaptchaRef = React.createRef()
	}

	handleChange = name => event => {
	    this.setState({
	      [name]: event.target.value,
	    });
 	};

	isValidate() {
		const recaptchaValue = this.recaptchaRef.current.getValue()
		const { username, password } = this.state

		if(!!recaptchaValue && validateUsername(username) && validatePassword(password)) {
			return true
		} 
	}
	onSubmit = (e) => {
		e.preventDefault()
		const { username, password } = this.state
		const captcha = this.recaptchaRef.current.getValue()

		this.props.registerUser(username, password, captcha, () => {
			this.props.history.push('/news')
		})
	}	
	onChange = () => {
		if(this.isValidate()) {
			this.setState({ isValidate: true })
		} else {
			this.setState({ isValidate: false })
		}
	}
	render() {
		return(
			<div className="registration">
				<div className="article">
					<Form className="form" onSubmit={this.onSubmit} onChange={this.onChange}>
				        <FormGroup>
				          <Label for="title">Username</Label>
				          <Input 
				              ref={this.username}
					          type="text" 
					          name="Username" 
					          id="Username" 
					          placeholder="Username..." 
					          onChange={this.handleChange('username')}
					       />
				        </FormGroup>
				        <FormGroup>
				          <Label for="text">Password</Label>
				          <Input
					          type="password" 
					          name="password" 
					          placeholder="Password..." 
					          onChange={this.handleChange('password')}
				          />
				        </FormGroup>
				        <ReCAPTCHA
				        	ref={this.recaptchaRef}
				       		sitekey="6Lf8yzMUAAAAANw9ylYiGxK-4etO5LKXEvCivQJt"
						/>
				        <Button 
					        color="success" 
					        className="register-button"
					        disabled={!this.state.isValidate}
				        >Регистрация</Button>
			      	</Form>
			 	 </div>
			</div>
		)
	}
}

Registration.propTypes = {
	registerUser: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
	registerUser: (name, password, captcha, cb) => dispatch(registerUser(name, password, captcha, cb))
})

export default connect(null, mapDispatchToProps)(Registration)