import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from './home';


const Pages = () => {
    return (
        <Router>
              <Route exact path="/" component={Home} />
        </Router>
    );
};

export default Pages