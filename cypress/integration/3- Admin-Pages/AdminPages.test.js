/// <reference types="cypress" />

describe('Basic Tests', () => {
  it('The SignUp page loads successfully', () => {
    cy.viewport(1280, 720);
    cy.visit('http://localhost:1234/AdminSignUp');
  });

  it('Admin sign in works fine', () => {
    // 1. Direct to the Sign in Page
    cy.visit('http://localhost:1234/AdminSignUp');

    // 2. Check for invalid inputs
    cy.log('Going to click Sign in without any input');
    cy.get('[data-testid="signInBtn"]').click();
    cy.contains('Response not successful').should('exist');

    // 3. Check for valid inputs
    cy.log('Going to click Sign in with valid inputs');
    cy.get('[name=adminSignInEmail]').type('testadmin@gmail.com');
    cy.get('[name=adminSignInPassword]').type('test1234');
    cy.get('[data-testid="signInBtn"]').click();

    // 4. verify the page URL
    cy.url().should('include', '/adminHome');
    cy.url().then(value => {
      cy.log('The current real URL is: ', value);
    });

    // 5.Go back to the sign in page
    cy.go('back');
  });

  it('Admin sign up works fine', () => {
    // 1. Direct to the Sign in Page
    cy.visit('http://localhost:1234/AdminSignUp');

    // 2. Directing to the SignUp
    cy.get('[data-testid="signUpBtnGhost"]').click();

    // 3. Check for invalid inputs for Signing up
    cy.log('Going to click Sign up with invalid inputs');
    cy.get('[name=adminSignUpEmail]').type('testmin@gmail.com');
    cy.get('[name=adminSignUpPassword]').type('tes234');
    cy.get('[data-testid="signUpBtn"]').click();
    cy.contains('Response not successful').should('exist');

    // 4. Check for valid inputs for Signing up
    cy.log('Going to click Sign up with valid inputs');
    cy.get('[name=adminSignUpUsername]').type('TestAdmin10');
    cy.get('[name=adminSignUpEmail]').clear();
    cy.get('[name=adminSignUpEmail]').type('testadmin10@gmail.com');
    cy.get('[name=adminSignUpPassword]').clear();
    cy.get('[name=adminSignUpPassword]').type('test101234');
    cy.get('[name=adminSignUpSecurityKey]').type('12345678');
    cy.get('[data-testid="signUpBtn"]').click();

    // 5. verify the page URL
    cy.url().should('include', '/adminHome');
    cy.url().then(value => {
      cy.log('The current real URL is: ', value);
    });
  });

  it('Admin Dashboard routing works fine', () => {
    cy.viewport(1280, 720);
    // 1. Direct to the Sign in Page
    cy.visit('http://localhost:1234/AdminSignUp');

    // 2. Directing to the Home Page
    cy.log('Going to click Sign in with valid inputs');
    cy.get('[name=adminSignInEmail]').type('testadmin@gmail.com');
    cy.get('[name=adminSignInPassword]').type('test1234');
    cy.get('[data-testid="signInBtn"]').click();

    // 3.Check User Management Routing
    cy.contains('User Management').click();
    cy.url().should('include', '/admin/userManage');
    cy.url().then(value => {
      cy.log('The current real URL is: ', value);
    });
    cy.contains('Search').should('exist');

    // 3.Check User Management Routing
    cy.contains('Add Service').click();
    cy.url().should('include', '/admin/addService');
    cy.url().then(value => {
      cy.log('The current real URL is: ', value);
    });
    cy.contains('Add New Service').should('exist');

    // 3.Check Complaints Routing
    cy.contains('Complaints').click();
    cy.url().should('include', '/admin/complaints');
    cy.url().then(value => {
      cy.log('The current real URL is: ', value);
    });
    cy.contains('User Complaints').should('exist');
  });

  it('User Management page works fine', () => {
    cy.viewport(1280, 720);
    // 1. Direct to the Sign in Page
    cy.visit('http://localhost:1234/AdminSignUp');

    // 2. Directing to the User Management page
    cy.log('Going to click Sign in with valid inputs');
    cy.get('[name=adminSignInEmail]').type('testadmin@gmail.com');
    cy.get('[name=adminSignInPassword]').type('test1234');
    cy.get('[data-testid="signInBtn"]').click();
    cy.contains('User Management').click();

    // 3.Check Profiles tab
    cy.get('#nav-tab-2').click();
    cy.contains('Visit').should('exist');
    cy.get('#nav-tab-1').click();
    cy.contains('Activate').should('exist');
    cy.get('#nav-tab-0').click();
    cy.contains('Approve').should('exist');

    // 3.Check Approved Profiles functions
    cy.get('#nav-tab-2').click();
    cy.contains('Visit').click();
    cy.url().should('include', '/viewServiceProvider/');
    cy.url().then(value => {
      cy.log('The current real URL is: ', value);
    });
    cy.go('back');
  });

  it('Visit, suspend and remove functionalities work fine under approved profiles', () => {
    cy.viewport(1280, 720);
    // 1. Direct to the Sign in Page
    cy.visit('http://localhost:1234/AdminSignUp');

    // 2. Directing to the User Management page
    cy.log('Going to click Sign in with valid inputs');
    cy.get('[name=adminSignInEmail]').type('testadmin@gmail.com');
    cy.get('[name=adminSignInPassword]').type('test1234');
    cy.get('[data-testid="signInBtn"]').click();
    cy.contains('User Management').click();

    // 3.Check Visit Button
    cy.get('#nav-tab-2').click();
    cy.contains('Visit').click();
    cy.url().should('include', '/viewServiceProvider/');
    cy.url().then(value => {
      cy.log('The current real URL is: ', value);
    });
    cy.go('back');

    // 4.Check Suspend Button
    cy.get('#nav-tab-2').click();
    cy.contains('Suspend').click();

    // 5.Check Activate Button
    cy.get('#nav-tab-1').click();
    cy.contains('Activate').click();
    cy.go('back');
  });

  it('New Service Adding Successful.', () => {
    cy.viewport(1280, 720);
    // 1. Direct to the Sign in Page
    cy.visit('http://localhost:1234/AdminSignUp');

    // 2. Directing to the Add Service page
    cy.log('Going to click Sign in with valid inputs');
    cy.get('[name=adminSignInEmail]').type('testadmin@gmail.com');
    cy.get('[name=adminSignInPassword]').type('test1234');
    cy.get('[data-testid="signInBtn"]').click();
    cy.contains('Add Service').click();

    // 3.Check Service Adding
    cy.get('[name=createServiceServiceName]').type('TestService');
    cy.get('[name=createServiceUserType]').type('New Tester');
    cy.get('[name=createServiceDescription]').type('Test Description');
    const filepath = 'images/TestImage.jpeg';
    cy.get('input[type="file"]').attachFile(filepath);
    cy.get('[data-testid="FileUploadBtn"]').click();
    cy.get('[data-testid="SubmitBtn"]').click();
  });

  it('Complaint Resolving Successful.', () => {
    cy.viewport(1280, 720);
    // 1. Direct to the Sign in Page
    cy.visit('http://localhost:1234/AdminSignUp');

    // 2. Directing to the Complaints page
    cy.log('Going to click Sign in with valid inputs');
    cy.get('[name=adminSignInEmail]').type('testadmin@gmail.com');
    cy.get('[name=adminSignInPassword]').type('test1234');
    cy.get('[data-testid="signInBtn"]').click();
    cy.contains('Complaints').click();

    // 3.Check Complaint resolving
    cy.contains('Resolved').click();
    cy.contains('Successfully Removed').should('exist');
  });

  it.only('Admin Login out works fine.', () => {
    cy.viewport(1280, 720);
    // 1. Direct to the Sign in Page
    cy.visit('http://localhost:1234/AdminSignUp');

    // 2. Directing to the Home Page
    cy.log('Going to click Sign in with valid inputs');
    cy.get('[name=adminSignInEmail]').type('testadmin@gmail.com');
    cy.get('[name=adminSignInPassword]').type('test1234');
    cy.get('[data-testid="signInBtn"]').click();

    // 3.Check Logging out
    cy.contains('LogOut').click();
    cy.contains('using your e-mail').should('exist');
    cy.contains('GetItDone Admin Panel').should('not.exist');
  });
});
