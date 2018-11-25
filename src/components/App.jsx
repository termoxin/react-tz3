import React from 'react'
import Main from './Main'
import Navigation from '../containers/Nav'
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
    <div className="app">
        <Navigation />
        <Main />
    </div>
);

export default App