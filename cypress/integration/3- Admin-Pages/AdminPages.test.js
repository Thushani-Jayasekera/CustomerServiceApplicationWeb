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
});
