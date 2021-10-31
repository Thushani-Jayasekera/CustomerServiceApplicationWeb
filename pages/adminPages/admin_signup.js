import React, { useState } from 'react';
import './signupStyles.css';
import styled from 'styled-components';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import { ToastProvider, useToasts } from 'react-toast-notifications';

const SIGNUP_ADMIN = gql`
  mutation AdminSignUpMutation(
    $adminSignUpUsername: String!
    $adminSignUpEmail: String!
    $adminSignUpPassword: String!
  ) {
    adminSignUp(
      username: $adminSignUpUsername
      email: $adminSignUpEmail
      password: $adminSignUpPassword
    )
  }
`;

const SIGNIN_ADMIN = gql`
  mutation AdminSignInMutation(
    $adminSignInEmail: String!
    $adminSignInPassword: String!
  ) {
    adminSignIn(email: $adminSignInEmail, password: $adminSignInPassword)
  }
`;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        GetItDone!
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

//Styles
const H1 = styled.h1`
  font-weight: bold;
  margin: 0;
`;

const P = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

const A = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;

  :active {
    transform: scale(0.95);
  }

  :focus {
    outline: none;
  }
`;

const ButtonGhost = styled.button`
  border-radius: 20px;
  border: 1px solid;
  background-color: transparent;
  border-color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
`;
//styles end

const AdminSignUp = props => {
  const [values, setValues] = useState({});
  const { addToast } = useToasts();

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const client = useApolloClient();
  const [adminSignUp, { loading, error }] = useMutation(SIGNUP_ADMIN, {
    onCompleted: data => {
      console.log(data.adminSignUp);
      localStorage.setItem('token', data.adminSignUp);
      client.writeData({ data: { isLoggedIn: true } });
      props.history.push('/adminHome');
    }
  });

  const [adminSignIn, { loading2, error2 }] = useMutation(SIGNIN_ADMIN, {
    onCompleted: data => {
      console.log(data.adminSignIn);
      localStorage.setItem('token', data.adminSignIn);
      client.writeData({ data: { isLoggedIn: true } });
      props.history.push('/adminHome');
    },
    onError: error => {
      addToast(error.message.substring(15), { appearance: 'error' });
    }
  });

  return (
    <body className="adminSignupBody">
      <div className="admincontainer" id="admincontainer">
        <div className="adminform-admincontainer adminsign-up-admincontainer">
          <Form
            onSubmit={event => {
              event.preventDefault();
              console.log(values);
              adminSignUp({
                variables: {
                  ...values
                }
              });
            }}
          >
            <H1>Create Account</H1>
            <span>using your email for registration</span>
            <Input
              type="text"
              name={'adminSignUpUsername'}
              placeholder="User Name"
              onChange={handleChange}
            />
            <Input
              type="email"
              name={'adminSignUpEmail'}
              placeholder="Email"
              onChange={handleChange}
            />
            <Input
              type="password"
              name={'adminSignUpPassword'}
              placeholder="Password"
              onChange={handleChange}
            />
            <Button type="submit">Sign Up</Button>
          </Form>
        </div>
        <div className="adminform-admincontainer adminsign-in-admincontainer">
          <Form
            onSubmit={event => {
              event.preventDefault();
              console.log(values);
              adminSignIn({
                variables: {
                  ...values
                }
              });
            }}
          >
            <H1>Sign in</H1>
            <span>using your e-mail</span>
            <Input
              type="email"
              name={'adminSignInEmail'}
              placeholder="Email"
              onChange={handleChange}
            />
            <Input
              type="password"
              name={'adminSignInPassword'}
              placeholder="Password"
              onChange={handleChange}
            />
            <A href="#">Forgot your password?</A>
            <Button type="submit">Sign In</Button>
          </Form>
        </div>
        <div className="adminoverlay-admincontainer">
          <div className="adminoverlay">
            <div className="adminoverlay-panel adminoverlay-left">
              <H1>Welcome Back!</H1>
              <P>
                To keep connected, please login with your administrative info
              </P>
              <ButtonGhost
                id="signIn"
                onClick={() => {
                  const admincontainer = document.getElementById(
                    'admincontainer'
                  );
                  admincontainer.classList.remove('right-panel-active');
                }}
              >
                Sign In
              </ButtonGhost>
            </div>
            <div className="adminoverlay-panel adminoverlay-right">
              <H1>Hello, Admin!</H1>
              <P>Enter your details and start working</P>
              <ButtonGhost
                id="signUp"
                onClick={() => {
                  const admincontainer = document.getElementById(
                    'admincontainer'
                  );
                  admincontainer.classList.add('right-panel-active');
                }}
              >
                Sign Up
              </ButtonGhost>
            </div>
          </div>
        </div>
      </div>
      <Copyright />
    </body>
  );
};

export default AdminSignUp;
