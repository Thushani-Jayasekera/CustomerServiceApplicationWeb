import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import LoggedInRoute from '../components/utils/LoggedInRoute';
import Home from './home';
import Login from './login';
import SignUp from './signup';
import ServiceProviderRegisterPage from './service_provider_registration';
import Loader from '../components/utils/Loader';
import ServiceProviderRoute from '../components/utils/ServiceProviderRoute';
import ServiceProviderProfilePage from './service_provider_profile';

import FindJobsPage from './find_jobs';

import AddDetailsPage from './service_requester_addDetails';

import FindServicePage from './find_service';

import SelectOptionPage from './service_option';
import ServiceRequesterWelcomePage from './service_requester_welcome';

const Pages = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <Route
        exact
        path="/service_requester/createRequest/:provider_id"
        component={FindServicePage}
      />
      <Route
        exact
        path="/service_requester/selectOption/:type"
        component={SelectOptionPage}
      />
      <Route
        exact
        path="/service_requester/selectOption"
        component={ServiceRequesterWelcomePage}
      />
      <LoggedInRoute
        exact
        path="/service_provider/register"
        component={ServiceProviderRegisterPage}
      />
      <ServiceProviderRoute
        exact
        path={'/service_provider'}
        component={ServiceProviderProfilePage}
      />

      <ServiceProviderRoute
        exact
        path={'/service_provider/find_jobs'}
        component={FindJobsPage}
      />

      <LoggedInRoute
        exact
        path="/service_requester/addDetails"
        component={AddDetailsPage}
      />

      <Route exact path={'/test'} component={Loader} />
    </Router>
  );
};

export default Pages;
