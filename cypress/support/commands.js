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

Cypress.Commands.add('getIframeBody', () => {
  return cy
  .get('#storybook-preview-iframe', { log: false })
  .its('0.contentDocument.body', { log: false }).should('not.be.empty')
  .then((body) => cy.wrap(body, { log: false }))
})

Cypress.Commands.add('getStylesForStorybook', (data, selector) => {
  return cy.getIframeBody().find(selector).then((elements) => {
    const styles = []
    elements.each((_, $el) => {
      let compStyles = window.getComputedStyle($el);
      Object.keys(data).forEach(key => {
        const item = {
          prop: key,
          value: compStyles.getPropertyValue(key)
        }
        styles.push(item)
      });

    });
    return styles;
  });
})

Cypress.Commands.add('getStyles', (data, selector) => {
  return cy.get(selector).then((elements) => {
    const styles = []
    elements.each((_, $el) => {
      let compStyles = window.getComputedStyle($el);
      Object.keys(data).forEach(key => {
        const item = {
          prop: key,
          value: compStyles.getPropertyValue(key)
        }
        styles.push(item)
      });

    });
    return styles;
  });
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

