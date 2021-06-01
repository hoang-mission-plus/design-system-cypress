

describe('Button', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#component-button--button').click()
    cy.fixture('base-button.json').as('data')
  })
  it('compare base button style', () => {
    cy.get('@data').then((response) => {
      cy.getStylesForStorybook(response, '.bp3-button').then(styles => {
        styles.forEach(style => {
          const newStyle = `${style.prop}: ${response[style.prop]}`
          const currentStyle = `${style.prop}: ${style.value}`
          expect(newStyle).to.equal(currentStyle)
        })
      })
    })
  });

})