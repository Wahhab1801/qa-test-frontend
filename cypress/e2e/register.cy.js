import { selectors } from '../support/selectors';

describe('User Registration', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/register');
  });

  it('successfully registers with valid data', () => {
    const timestamp = Date.now();
    cy.registerUser({
      name: `testuser_${timestamp}`,
      email: `testuser+${timestamp}@mail.com`,
      password: 'Test@1234'
    });

    cy.contains(`Welcome, testuser_${timestamp}`).should('exist');
  });

  it('shows error for missing fields', () => {
    cy.get(selectors.submitBtn).click();

    cy.contains(/Expected a string but received a undefined/i).should('exist');
  });

  it('shows error for invalid email format', () => {
    cy.get(selectors.email).then(($input) => {
      $input[0].setCustomValidity('');
      $input[0].value = 'invalidEmail'; 
      $input[0].reportValidity(); // forces the popup to show
      expect($input[0].validationMessage).to.contain("include an '@'");
    });
  });

  it('blocks registration with weak password', () => {
    cy.get(selectors.name).type('testName');
    cy.get(selectors.email).type('testName@testDomain.com');
    cy.get(selectors.password).type('123');
    cy.get(selectors.submitBtn).click();

    cy.contains(/Please enter a strong password/i).should('exist');
  });

  it('handles already-used email gracefully', () => {
    cy.registerUser({
      name: 'existinguser',
      email: 'existinguser@mail.com',
      password: 'Test@1234'
    });

    cy.contains(/User already exists/i).should('exist');
  });

  it('handles server errors properly', () => {
    cy.intercept('POST', '**/register', {
      statusCode: 500,
      body: { message: 'Internal server error' }
    }).as('registerRequest');

    cy.registerUser({
      name: 'erroruser_' + Date.now(),
      email: 'erroruser@mail.com',
      password: 'Test@1234'
    });

    cy.wait('@registerRequest');
    cy.contains(/Internal server error/i).should('exist');
  });
});