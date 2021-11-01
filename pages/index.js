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
import AdminLogin from './admin_login';
import AdminSignUp from './adminPages/admin_signup';
import AdminHome from './adminPages/admin_home';
import AddService from './adminPages/add_service';
import UserManage from './adminPages/user_management';
import Complaints from './adminPages/complaints';
import FindJobsPage from './find_jobs';

import AddDetailsPage from './service_requester_addDetails';

import FindServicePage from './find_service';

import SelectOptionPage from './service_option';
import ServiceRequesterWelcomePage from './service_requester_welcome';
import CreateJobPostingPage from './create_job_posting';

import CommonProfilePage from './profile';
import JobPostingPage from './view_job_posting';
import MyBidsPage from './my_bids';
import ViewServiceRequestPage from './view_service_request';
import ServiceRequesterStatusPage from './view_serviceRequest_status_requester';

import ProfilePage from './profile_page';
import ServiceProviderStatusPage from './view_serviceRequest_status_provider';
import addComplaintPage from './add_complaint';
import MyJobPostingsPage from './my_job_postings';
import MyJobPostingBidsPage from './my_job_posting_bids';
import EditProfilePage from './editProfile';
import ViewServiceProvider from '../components/adminComponents/ViewServiceProvider';
import PaymentPage from './payment';
import PaymentSuccessPage from './payment/paymentSuccess';
import MessengerPage from './messenger';
import Messenger2Page from "./messenger_2";
import ReviewPage from "./review";

const Pages = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/adminHome" component={AdminHome} />
      <Route exact path="/adminSignup" component={AdminSignUp} />
      <Route exact path="/admin/addService" component={AddService} />
      <Route exact path="/admin/userManage" component={UserManage} />
      <Route exact path="/admin/complaints" component={Complaints} />
      <Route exact path={"/messenger2"} component={Messenger2Page}/>
      <Route
        exact
        path="/viewServiceProvider/:id"
        component={ViewServiceProvider}
      />
      <Route exact path={'/payment'} component={PaymentPage} />
      <Route exact path={'/payment/success'} component={PaymentSuccessPage} />
      <Route exact path={'/message'} component={MessengerPage}/>

      <ServiceRequesterRoute
        exact
        path="/service_requester/createRequest/:provider_id"
        component={FindServicePage}
      />
      <ServiceRequesterRoute exact path={"/requesterReview/add/:id"} component={ReviewPage} />
      <ServiceProviderRoute exact path={"/providerReview/add/:id"} component={ReviewPage}/>
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
      <LoggedInRoute exact path={'/profile'} component={CommonProfilePage} />

      <ServiceProviderRoute
        exact
        path={'/profile/serviceRequestsForMe'}
        component={ServiceProviderStatusPage}
      />
      <ServiceRequesterRoute
        exact
        path={'/profile/serviceRequestsSent'}
        component={ServiceRequesterStatusPage}
      />
      <ServiceRequesterRoute
        exact
        path={'/myJobPostings'}
        component={MyJobPostingsPage}
      />
      <ServiceRequesterRoute
        exact
        path={'/myJobPostings/:id'}
        component={MyJobPostingBidsPage}
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

      <LoggedInRoute
        exact
        path={'/service_request/:id'}
        component={ViewServiceRequestPage}
      />
      <LoggedInRoute exact path={'/editProfile'} component={EditProfilePage} />

      <LoggedInRoute
        exact
        path="/service_requester/addDetails"
        component={AddDetailsPage}
      />
      <Route exact path={'/add_complaint'} component={addComplaintPage} />
      <ServiceProviderRoute exact path={'/myBids'} component={MyBidsPage} />

      <Route exact path={'/test'} component={Loader} />

      <Route exact path={'/admin'} component={AdminLogin} />
    </Router>
  );
};

export default Pages;
