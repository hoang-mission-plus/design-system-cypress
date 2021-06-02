import Button from "../support/Page Objects/button"

describe('Base Button', function () {

  beforeEach(function () {
    cy.visit('/')
    this.button = new Button();
    this.button.getComponentButton().click()
    cy.xpath("//td//span[text()='intent']/ancestor::tr//select").select('none')
    cy.wait(1000)
    cy.fixture('button').then(function (data) {
      this.data = data;
    })
  })

  it('compare base button style when active', function () {
    cy.get('#active').click()
    this.button.getBaseButton().compareStyles(this.data.active_base_button);
  });

  it('compare base button style when hover', function () {
    this.button.getBaseButton().realHover()
    this.button.getBaseButton().compareStyles(this.data.hover_base_button);
  });

  it('compare base button style when pressed', function () {
    this.button.getBaseButton().realPress()
    this.button.getBaseButton().compareStyles(this.data.press_base_button);
  });

  it('compare base button style when disabled', function () {
    cy.get('#disabled').click();
    this.button.getBaseButton().should("have.class", "bp3-disabled")
    this.button.getBaseButton().compareStyles(this.data.disabled_base_button);
  });

})