import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from './home';
import Login from './login'
import SignUp from './signup'
const Pages = () => {
    return (
        <Router>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login}/>
              <Route exact path="/signup" component={SignUp}/>
        </Router>
    );
};

export default Pages