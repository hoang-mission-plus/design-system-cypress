import Button from "../support/Page Objects/button"

describe('Button', function () {

  beforeEach(function () {
    cy.visit('/')
    this.button = new Button();
    this.button.getComponentButton().click()
    cy.fixture('base-button').then(function (data) {
      this.data = data;
    })
  })

  it('compare base button style', function () {
    this.button.getBaseButton().compareStyles(this.data.base_button);
  });

  it('compare base button style when disabled', function () {
    cy.get('#disabled').click();
    this.button.getBaseButton().should("have.class", "bp3-disabled")
    this.button.getBaseButton().compareStyles(this.data.disabled_base_button);
  });

})