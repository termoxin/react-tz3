import React from 'react'
import Main from './Main'
import Navigation from '../containers/Nav'
import Footer from '../components/Footer'
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
    <div className="app">
        <Navigation />
        <Main />
        <Footer />
    </div>
);

export default App