describe("Testing Test", () => {
  it("Testing is working", () => {
    expect(true).to.equal(true);
  })
})

describe('API is Alive', () => {
  it('Checks the server is alive', () => {
    cy.request('/')
  })
})