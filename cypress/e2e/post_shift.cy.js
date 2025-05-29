import { selectors } from "../support/selectors";

describe('Post Shift', () => {
    beforeEach(() => {
      cy.fixture('user').then((user) => {
        cy.visit('http://localhost:3000/login');
        cy.get(selectors.email).type(user.existingUser.email);
        cy.get(selectors.password).type(user.existingUser.password);
        cy.get(selectors.submitBtn).click();
        cy.contains(/Welcome, Existinguser/i); 
  
        cy.visit('http://localhost:3000/');
      });
    });
  
    it('successfully posts a shift with valid data', () => {
      cy.get(selectors.title).type('Morning Shift');
      cy.get(selectors.description).type('9 AM - 1 PM, front desk support.');
      cy.contains('Post Shift').click();
  
      cy.contains('Morning Shift').should('exist');
      cy.contains('9 AM - 1 PM, front desk support.').should('exist');
    });
  
    it('shows error when title is missing', () => {
      cy.get(selectors.description).type('Evening shift.');
      cy.contains('Post Shift').click();
  
      cy.get(selectors.title).then(($input) => {
        $input[0].setCustomValidity('');
        $input[0].value = '';
        $input[0].reportValidity(); // forces the popup to show
        expect($input[0].validationMessage).to.contain("Please fill out this field.");
      });
    });
  
    it('shows error when description is missing', () => {
      cy.get(selectors.title).type('Night Shift');
      cy.contains('Post Shift').click();
  
      cy.get(selectors.description).then(($input) => {
        $input[0].setCustomValidity('');
        $input[0].value = '';
        $input[0].reportValidity(); // forces the popup to show
        expect($input[0].validationMessage).to.contain("Please fill out this field.");
      });
    });
  });