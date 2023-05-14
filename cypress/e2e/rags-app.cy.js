describe("Rags app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3003");
  });

  it("front page can be opened", function () {
    cy.contains("Rags!");
    cy.contains("Hide your shame!");
  });

  it("popular products are rendered", function () {
    cy.contains(/popular products/i);
  });
});
