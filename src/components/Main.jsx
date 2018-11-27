import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import News from '../pages/News'
import Home from './Home'
import '../styles/App.css'

class Main extends Component {
  render() {
    return (
      <div className="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/news" component={News.components.NewsContainer} />
          <Route path="/news/:id" component={News.components.Article}/>
          <Route path="/news/:id/edit" />
        </Switch>
      </div>
    );
  }
}

export default Main
