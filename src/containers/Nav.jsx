import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { connect } from 'react-redux'
import { authUser, logoutUser } from '../actions/loginAction'
import {
  Navbar,
  Nav,
  NavItem,
  Button
} from 'reactstrap';
import * as FontAwesome from 'react-icons/fa'


class Navigation extends Component {
    authSuccess = res => {
        const { profileObj, tokenId } = res
        this.props.authUser(profileObj, tokenId)
    }

    authError = res => {
        console.log(res)
    }

    logout = () => {
        this.props.logout()
    }

    render() {
        const { isAuth, user } = this.props
        return(
            <div className="nav">
               <Navbar color="dark" dark>
                  <Link to="/news" className="header"><FontAwesome.FaHome /> Главная </Link>
                    <Nav navbar>
                      <NavItem>
                      {
                        isAuth ? <span className="login-user">{user.user.user.givenName} | </span> : ''
                      }
                      {
                        isAuth ?
                            <GoogleLogout
                                buttonText="Выйти"
                                render={renderProps => (
                                     <Button 
                                       color="danger" 
                                       onClick={renderProps.onClick}
                                     >
                                       Выйти <FontAwesome.FaUserTimes /> 
                                     </Button>
                                )}
                                onLogoutSuccess={this.logout}
                            />
                            :
                            <div>
                              <Button color="primary" className="registration">
                                <Link to="/registration">
                                  <FontAwesome.FaStreetView /> Регистрация 
                                </Link>
                              </Button>
                              <GoogleLogin
                                 clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                 buttonText="Войти"
                                 render={renderProps => (
                                    <Button 
                                      color="primary" 
                                      onClick={renderProps.onClick}
                                    >
                                    <FontAwesome.FaUser /> Войти через <FontAwesome.FaGooglePlus />
                                    </Button>
                                 )}
                                 onSuccess={this.authSuccess}
                                 onFailure={this.authError}
                             />
                             <Button color="success" className="login-button">
                              <Link to="/login">
                                  <FontAwesome.FaPaperPlane /> Войти 
                                </Link>
                             </Button>
                            </div>
                      }
                      </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

Navigation.propTypes = {
  authUser: PropTypes.func,
  isAuth: PropTypes.bool,
  logout: PropTypes.func,
  user: PropTypes.object
}

const mapDispatchToProps = dispatch => ({
  authUser: (user, token) => dispatch(authUser(user, token)),
  logout: () => dispatch(logoutUser())
})

const mapStateToProps = state => ({
  isAuth: state.user.isAuth,
  user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)

