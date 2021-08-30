import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import LoggedInRoute from '../components/utils/LoggedInRoute'
import Home from './home';
import Login from './login'
import SignUp from './signup'
import ServiceProviderRegisterPage from "./service_provider_registration";
import Loader from "../components/utils/Loader";
import ServiceProviderRoute from "../components/utils/ServiceProviderRoute";
import ServiceProviderProfilePage from "./service_provider_profile";
import AddDetailsPage from './service_requester_addDetails';
const Pages = () => {
    return (
        <Router>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login}/>
              <Route exact path="/signup" component={SignUp}/>
              <LoggedInRoute exact path="/service_provider/register" component={ServiceProviderRegisterPage}/>
              <ServiceProviderRoute exact path={"/service_provider"} component={ServiceProviderProfilePage}/>
              <LoggedInRoute exact path="/service_requester/addDetails" component={AddDetailsPage}/>
              <Route exact path={"/test"} component={Loader}/>
        </Router>
    );
};

export default Pages