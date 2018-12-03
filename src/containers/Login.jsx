import React, { Component } from 'react'
import { validatePassword, validateUsername } from '../helpers/validators'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { authUserWithPassword } from '../actions/loginAction'
import { connect } from 'react-redux'

class Login extends Component {
	constructor(props) {
		super(props)

		this.state = {
			username: '',
			password: ''
		}
	}

	handleChange = name => event => {
	    this.setState({
	      [name]: event.target.value,
	    });
 	}

 	onSubmit = (e) => {
		e.preventDefault()
		
		const { username, password } = this.state
		
		this.props.authUserWithPassword(username, password, () => {
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

	isValidate() {
		const { username, password } = this.state

		if(validateUsername(username) && validatePassword(password)) {
			return true
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
				        <Button 
					        color="success" 
					        disabled={!this.state.isValidate}
				        >Войти</Button>
			      	</Form>
			 	 </div>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	authUserWithPassword: (username, password, cb) => dispatch(authUserWithPassword(username, password, cb))
})

export default connect(null, mapDispatchToProps)(Login)