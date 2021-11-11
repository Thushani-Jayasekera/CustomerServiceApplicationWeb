///<reference types="cypress"/>
describe('SERVICE REQUESTING', function() {
    beforeEach(() => {
        cy.visit('http://localhost:1234/login')
 
   // cy.get('[type=email]').click()
 
    cy.get('[type=email]').type('akith@gmail.com')
 
    //cy.get('[type="password"]').click()
 
    cy.get('[type="password"]').type('12345')
 
    cy.get('.login__SubmitButton-sc-56wq6z-1').click()
 
      });

    it('check the total flow', function() {
   
       cy.viewport(1536, 754)
    
       cy.visit('http://localhost:1234/')
    
       cy.get('.Layout__StyledDiv-kf2q67-0 > .sc-bdVaJa > .sc-bZQynM > .sc-bwzfXH > .sc-htpNat:nth-child(1)').click()
    
       cy.visit('http://localhost:1234/service_requester/selectOption')
    
       cy.get('.sc-jwKygS > .sc-lhVmIH > .sc-bYSBpT > div:nth-child(1) > .sc-elJkPf').click()
    
       cy.get('.sc-jwKygS > .sc-lhVmIH > .sc-bYSBpT > div:nth-child(1) > .sc-elJkPf').type('Akith Perera')
    
       cy.get('.sc-jwKygS > .sc-lhVmIH > .sc-bYSBpT > div:nth-child(2) > .sc-elJkPf').click()
    
       cy.get('.sc-jwKygS > .sc-lhVmIH > .sc-bYSBpT > div:nth-child(2) > .sc-elJkPf').type('+94771293019')
    
       cy.get('.sc-jwKygS > .sc-lhVmIH > .sc-bYSBpT > div:nth-child(3) > .sc-elJkPf').type('36, Wennawatte, Wellampitiya')
    
       cy.get('.sc-jwKygS > .sc-lhVmIH > .sc-bYSBpT > div:nth-child(4) > .sc-elJkPf').type('Colombo')
    
       cy.get('.sc-jwKygS > .sc-lhVmIH > .sc-bYSBpT > div:nth-child(5) > .sc-elJkPf').type('10600')
    
       cy.get('.sc-cmTdod > .sc-jwKygS > .sc-lhVmIH > .sc-bYSBpT > .service_requester_addDetails__SubmitButton-fn7rai-1').click()
    
       cy.get('.Layout__StyledDiv-kf2q67-0 > .sc-bdVaJa > .sc-bZQynM > .sc-bwzfXH > .sc-htpNat:nth-child(1)').click()
    
       cy.visit('http://localhost:1234/service_requester/selectOption')
    
       cy.get('.sc-emmjRN:nth-child(1) > .sc-dymIpo > .Services__CardImageContainer-sc-12d9uu9-1 > .Services__CardHoverOverlay-sc-12d9uu9-3 > .sc-rBLzX > .sc-CtfFt').click()
    
       cy.visit('http://localhost:1234/service_requester/selectOption/Plumber')
    
       cy.get('.sc-hXRMBi:nth-child(4) > .sc-epnACN > .sc-iQKALj > .sc-bwCtUz > a:nth-child(1) > .Buttons__PrimaryButton-bkyvzu-0').click()
    
       cy.get('.columns > .column > .section > .MuiBox-root > .jss5').click()
    
       cy.get('.sc-hXRMBi:nth-child(4) > .sc-epnACN > .sc-iQKALj > .sc-bwCtUz > a:nth-child(2) > .Buttons__PrimaryButton-bkyvzu-0').click()
    
       cy.get('.find_service__FormContainer-sc-1po8zhh-0 > .find_service___StyledDiv-sc-1po8zhh-4 > .sc-iyvyFf > .sc-kfGgVZ > #date-input').click()
    
       cy.get('.find_service__FormContainer-sc-1po8zhh-0 > .find_service___StyledDiv-sc-1po8zhh-4 > .sc-iyvyFf > .sc-kfGgVZ > #date-input').type('2021-11-13')
    
       cy.get('.find_service__FormContainer-sc-1po8zhh-0 > .find_service___StyledDiv-sc-1po8zhh-4 > .sc-iyvyFf > .sc-kfGgVZ > #time-input').click()
    
       cy.get('.find_service__FormContainer-sc-1po8zhh-0 > .find_service___StyledDiv-sc-1po8zhh-4 > .sc-iyvyFf > .sc-kfGgVZ > #time-input').click()
    
       cy.get('.find_service__FormContainer-sc-1po8zhh-0 > .find_service___StyledDiv-sc-1po8zhh-4 > .sc-iyvyFf > .sc-kfGgVZ > #time-input').type('18:52')
    
       cy.get('.find_service__FormContainer-sc-1po8zhh-0 > .find_service___StyledDiv-sc-1po8zhh-4 > .sc-iyvyFf > .sc-kfGgVZ > #time-input').click()
    
       cy.get('.sc-iyvyFf > .sc-hwwEjo > .sc-kPVwWT > .sc-kfGgVZ > #min-input').click()
    
       cy.get('.sc-iyvyFf > .sc-hwwEjo > .sc-kPVwWT > .sc-kfGgVZ > #min-input').type('1200')
    
       cy.get('.sc-iyvyFf > .sc-hwwEjo > .sc-kPVwWT > .sc-kfGgVZ > #max-input').click()
    
       cy.get('.sc-iyvyFf > .sc-hwwEjo > .sc-kPVwWT > .sc-kfGgVZ > #max-input').type('9000')
    
       cy.get('.find_service__FormContainer-sc-1po8zhh-0 > .find_service___StyledDiv-sc-1po8zhh-4 > .sc-iyvyFf > .sc-kfGgVZ > select').click()
    
       cy.get('.find_service__FormContainer-sc-1po8zhh-0 > .find_service___StyledDiv-sc-1po8zhh-4 > .sc-iyvyFf > .sc-kfGgVZ > select').select('1')
    
       cy.get('.find_service__FormContainer-sc-1po8zhh-0 > .find_service___StyledDiv-sc-1po8zhh-4 > .sc-iyvyFf > .sc-kfGgVZ > select').click()
    
       cy.get('.find_service__FormContainer-sc-1po8zhh-0 > .find_service___StyledDiv-sc-1po8zhh-4 > .sc-iyvyFf > .sc-kfGgVZ > #job-input').click()
    
       cy.get('.find_service__FormContainer-sc-1po8zhh-0 > .find_service___StyledDiv-sc-1po8zhh-4 > .sc-iyvyFf > .sc-kfGgVZ:nth-child(8) > input:nth-child(2)').click()
    
       cy.get('.find_service__FormContainer-sc-1po8zhh-0 > .find_service___StyledDiv-sc-1po8zhh-4 > .sc-iyvyFf > .sc-kfGgVZ:nth-child(8) > input:nth-child(2)').type('C:\fakepath\vlcsnap-2021-11-01-14h17m46s129.png')
    
       cy.get('.find_service__FormContainer-sc-1po8zhh-0 > .find_service___StyledDiv-sc-1po8zhh-4 > .sc-iyvyFf > .sc-kfGgVZ > .button:nth-child(3)').click()
    
       cy.get('.react-toast-notifications__container > .css-h2fnfe > .react-toast-notifications__toast > .react-toast-notifications__toast__icon-wrapper > .react-toast-notifications__toast__countdown').click()
    
       cy.get('.sc-gzOgki > .find_service__FormContainer-sc-1po8zhh-0 > .find_service___StyledDiv-sc-1po8zhh-4 > .sc-iyvyFf > .sc-ibxdXY').click()
    
       cy.get('div > .Layout__StyledDiv-kf2q67-0 > .container > .box > .button').click()
    
       cy.visit('http://localhost:1234/')
    
       cy.get('.Layout__StyledDiv-kf2q67-0 > .sc-bdVaJa > .sc-bZQynM > .sc-bwzfXH > .sc-htpNat:nth-child(5)').click()
    
       cy.visit('http://localhost:1234/profile')
    
       cy.get('.column > .level:nth-child(5) > .level-item:nth-child(2) > a > .is-link').click()
    
       cy.get('.sc-etwtAo > div > .columns > a > .button').click()
    
       cy.get('div > .Layout__StyledDiv-kf2q67-0 > .container > .section > .button:nth-child(3)').click()
    
       cy.get('.sc-jtggT > .view_service_request__FormContainer-sc-1dk3djn-0 > .sc-ebFjAB > .sc-LKuAh > #date-input').click()
    
       cy.get('.sc-jtggT > .view_service_request__FormContainer-sc-1dk3djn-0 > .sc-ebFjAB > .sc-LKuAh > #date-input').type('2021-11-19')
    
       cy.get('.sc-jtggT > .view_service_request__FormContainer-sc-1dk3djn-0 > .sc-ebFjAB > .sc-LKuAh > #time-input').click()
    
       cy.get('.sc-jtggT > .view_service_request__FormContainer-sc-1dk3djn-0 > .sc-ebFjAB > .sc-LKuAh > #time-input').type('16:57')
    
       cy.get('.container > .section > .sc-jtggT > .view_service_request__FormContainer-sc-1dk3djn-0 > .sc-ebFjAB').click()
    
       cy.get('.section > .sc-jtggT > .view_service_request__FormContainer-sc-1dk3djn-0 > .sc-ebFjAB > .sc-kxynE').click()
    
       cy.visit('http://localhost:1234/service_request/618cfd358a6d4085988c4e5e')
    
       cy.get('div > .Layout__StyledDiv-kf2q67-0 > .container > .section > .button:nth-child(4)').click()
    
       cy.get('.sc-jtggT > .view_service_request__FormContainer-sc-1dk3djn-0 > .sc-ebFjAB > .sc-LKuAh > #job-input').click()
    
       cy.get('.section > .sc-jtggT > .view_service_request__FormContainer-sc-1dk3djn-0 > .sc-ebFjAB > .sc-kxynE').click()
    
       cy.visit('http://localhost:1234/service_request/618cfd358a6d4085988c4e5e')
    
       cy.get('#root > div > .Layout__StyledDiv-kf2q67-0 > .container > .section:nth-child(2)').click()
    
       cy.get('div > .Layout__StyledDiv-kf2q67-0 > .container > .section > .is-danger').click()
    
       cy.visit('http://localhost:1234/service_request/618cfd358a6d4085988c4e5e')
    
    })
   
   })
   