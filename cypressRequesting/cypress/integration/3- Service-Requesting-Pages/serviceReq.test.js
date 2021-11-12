///<reference types="cypress"/>




describe('Homepage',()=>{
    it('should have the correct page title',()=>{
        cy.viewport(1280, 720);
        cy.visit('http://localhost:1234/')

        cy.contains('best service');
        cy.contains('best platform available');

        
    });
})

describe('Find service',()=>{
    beforeEach(() => {
        cy.visit('http://localhost:1234/login');
        cy.get('[type=email]').type('tiara@gmail.com');
        cy.get('[type="password"]').type('12345');
        cy.get('.login__SubmitButton-sc-56wq6z-1').click();
      });
    it('should be able to login and visit find service and go back',()=>{
        cy.viewport(1280, 720);
        cy.visit('http://localhost:1234/login');
        cy.get('[type=email]').type('tiara@gmail.com');
        cy.get('[type="password"]').type('12345');
        cy.get('.login__SubmitButton-sc-56wq6z-1').click();


        cy.visit('http://localhost:1234/')
        
        cy.contains('Find Service').click();


        cy.url().should('include', '/service_requester/selectOption');

        cy.go('back');

        
        

        
    });

    it('should be able to login and visit find service and select a category',()=>{
        cy.viewport(1280, 720);
      


        //cy.visit('http://localhost:1234/')
        //cy.get('.sc-bZQynM > .sc-bwzfXH > [href="/service_requester/selectOption"]').click();


        //cy.url().should('include', '/service_requester/selectOption');
        cy.visit('http://localhost:1234/service_requester/selectOption')
        //cy.get(':nth-child(1) > .sc-dymIpo > :nth-child(2) > .sc-bMvGRv').click();
        
        
        //cy.url().should('include', '/service_requester/selectOption/Plumber');

        
        

        
    });

    it('should load providers by catogory page succesfully ', ()=>{
        cy.viewport(1280, 720);
        cy.visit('http://localhost:1234/service_requester/selectOption/Plumber')

    })

    it('should view profile of user when clicked', ()=>{
        cy.viewport(1290,720);

        cy.visit('http://localhost:1234/service_requester/selectOption/Plumber')
        cy.contains('View Profile').click()
        cy.url().should('include', '/user/')
    })

    it('should visit the reqquest form page when Hire Now is clicked',()=>{
        cy.viewport(1290,720);

        cy.visit('http://localhost:1234/service_requester/selectOption/Plumber')
        cy.contains('Hire Now').click()
        cy.url().should('include', '/service_requester/createRequest/');
    })

    it('should fill the request form and submit properly', ()=>{
        cy.visit('http://localhost:1234/service_requester/createRequest/612c92089d1b2535d4e0a909')
        cy.url().should('include', '/service_requester/createRequest/612c92089d1b2535d4e0a909');
        cy.contains('mm/dd/yyyy').type('11/12/2021');
        cy.get('#time-input').type('06:21 PM');
        cy.get('#min-input').type('1000')
        cy.get('#max-input').type('1500')
        cy.get('select').select("0")
        cy.get('#job-input').type("the job input")
        cy.contains('SUBMIT').click();
        cy.url().should('include', '/hireNow/');

    })
})


describe('Profile',()=>{
    beforeEach(() => {
        cy.visit('http://localhost:1234/login');
        cy.get('[type=email]').type('tiara@gmail.com');
        cy.get('[type="password"]').type('12345');
        cy.get('.login__SubmitButton-sc-56wq6z-1').click();
      });
    it('should be able to login and visit profile and go back',()=>{
        cy.viewport(1280, 720);
        cy.visit('http://localhost:1234/login');
        cy.get('[type=email]').type('tiara@gmail.com');
        cy.get('[type="password"]').type('12345');
        cy.get('.login__SubmitButton-sc-56wq6z-1').click();


        cy.visit('http://localhost:1234/')
        
        cy.contains('Profile').click();


        cy.url().should('include', '/profile');

        cy.go('back');

        
        

        
    });

    it('should be able to visit profile and go to a my request',()=>{
        cy.viewport(1280, 720);
      


        cy.visit('http://localhost:1234/profile')
        cy.contains('requests by').click();


        cy.url().should('include', '/profile/serviceRequestsSent');
        
        //cy.get(':nth-child(1) > .sc-dymIpo > :nth-child(2) > .sc-bMvGRv').click();
        
        
        //cy.url().should('include', '/service_requester/selectOption/Plumber');

        
        

        
    });

    it('should be able to visit profile and go to for me request',()=>{
        cy.viewport(1280, 720); 
        cy.visit('http://localhost:1234/profile')
        cy.contains('requests for me').click();

    });

    it('should click and view a pending request',()=>{
        cy.viewport(1280, 720); 
        cy.visit('http://localhost:1234/profile/serviceRequestsSent')
        cy.contains('View').click()

        
    })
})