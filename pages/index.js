import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import LoggedInRoute from '../components/utils/LoggedInRoute';
import Home from './home';
import Login from './login';
import SignUp from './signup';
import ServiceProviderRegisterPage from './service_provider_registration';
import Loader from '../components/utils/Loader';
import ServiceProviderRoute from '../components/utils/ServiceProviderRoute';
import ServiceRequesterRoute from '../components/utils/ServiceRequesterRoute';

import FindJobsPage from './find_jobs';

import AddDetailsPage from './service_requester_addDetails';

import FindServicePage from './find_service';

import SelectOptionPage from './service_option';
import ServiceRequesterWelcomePage from './service_requester_welcome';
import CreateJobPostingPage from './create_job_posting';
import CommonProfilePage from "./profile";
import JobPostingPage from "./view_job_posting";
import MyBidsPage from "./my_bids";
import ViewServiceRequestPage from './view_service_request';
import ProfilePage from './profile_page';


const Pages = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <ServiceRequesterRoute
        exact
        path="/service_requester/createRequest/:provider_id"
        component={FindServicePage}
      />
      <ServiceRequesterRoute
        exact
        path="/service_requester/selectOption/:type"
        component={SelectOptionPage}
      />
      <ServiceRequesterRoute
        exact
        path="/service_requester/selectOption"
        component={ServiceRequesterWelcomePage}
      />
      <ServiceRequesterRoute
        exact
        path="/service_requester/createBiddingJob"
        component={CreateJobPostingPage}
      />

      <LoggedInRoute
        exact
        path="/service_provider/register"
        component={ServiceProviderRegisterPage}
      />
      <LoggedInRoute
        exact
        path={'/profile'}
        component={CommonProfilePage}
      />

      <LoggedInRoute
        exact
        path={'/testprofile'}
        component={ProfilePage}
      />

      <ServiceProviderRoute
        exact
        path={'/service_provider/find_jobs'}
        component={FindJobsPage}
      />
        <ServiceProviderRoute
          exact
          path={'/job_posting/:id'}
          component={JobPostingPage}
        />

        <ServiceProviderRoute
          exact
          path={'/service_request/:id'}
          component={ViewServiceRequestPage}
        />

      <LoggedInRoute
        exact
        path="/service_requester/addDetails"
        component={AddDetailsPage}
      />

      
      <ServiceProviderRoute exact path={"/myBids"} component={MyBidsPage}/>

      <Route exact path={'/test'} component={Loader} />
    </Router>
  );
};

export default Pages;
