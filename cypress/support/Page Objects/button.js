///<reference types="Cypress" />
class Button {
    getBaseButton() {
        return cy.getIframeBody().find(".bp3-button");
    }

    getComponentButton() {
        return cy.get('#component-button--button');
    }
}

export default Button