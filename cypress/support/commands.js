import { selectors } from './selectors';

Cypress.Commands.add('registerUser', ({ name, email, password }) => {
  cy.get(selectors.name).clear().type(name);
  cy.get(selectors.email).clear().type(email);
  cy.get(selectors.password).clear().type(password);
  cy.get(selectors.submitBtn).click();
});