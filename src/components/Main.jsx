import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import News from '../pages/News'
import Home from './Home'
import Registration from '../containers/Registration'
import Login from '../containers/Login'
import '../styles/App.css'

class Main extends Component {
  render() {
    return (
      <div className="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/registration" component={Registration}/>
          <Route path="/login" component={Login}/>
          <Route path="/news" component={News.components.NewsContainer} />
        </Switch>
      </div>
    );
  }
}

export default Main
