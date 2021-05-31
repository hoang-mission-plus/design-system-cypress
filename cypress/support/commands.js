// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
///<reference types="Cypress" />

Cypress.Commands.add('forceClick', { prevSubject: 'element' }, (subject, options) => {
  cy.wrap(subject, { timeout: 10000 }).click({ force: true, multiple: true })
})

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    })
  }
  return originalFn(element, text, options)
})

