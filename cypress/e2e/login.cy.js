import { selectors } from '../support/selectors';

describe('User Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('successfully logs in with valid credentials', () => {
    cy.fixture('user').then((user) => {
      cy.get(selectors.email).type(user.existingUser.email);
      cy.get(selectors.password).type(user.existingUser.password);
      cy.get(selectors.submitBtn).click();

      cy.contains(/Welcome, Existinguser/i).should('exist');
    });
  });

  it('shows error for invalid password', () => {
    cy.fixture('user').then((user) => {
      cy.get(selectors.email).type(user.existingUser.email);
      cy.get(selectors.password).type(user.existingUser.wrongPassword);
      cy.get(selectors.submitBtn).click();

      cy.contains(/invalid credentials/i).should('exist');
    });
  });

  it('shows error for missing fields', () => {
    cy.get(selectors.submitBtn).click();

    cy.contains(/Please enter all fields/i).should('exist');
  });

  it('shows error for invalid email format', () => {
    cy.get(selectors.email).then(($input) => {
      $input[0].setCustomValidity('');
      $input[0].value = 'invalidEmail'; 
      $input[0].reportValidity(); // forces the popup to show
      expect($input[0].validationMessage).to.contain("include an '@'");
    });
  });

  it('handles server error on login', () => {
    cy.intercept('POST', '**/login', {
      statusCode: 500,
      body: { message: 'Internal server error' }
    }).as('loginRequest');

    cy.get(selectors.email).type('erroruser@mail.com');
    cy.get(selectors.password).type('Test@1234');
    cy.get(selectors.submitBtn).click();

    cy.wait('@loginRequest');
    cy.contains(/Internal server error/i).should('exist');
  });
});