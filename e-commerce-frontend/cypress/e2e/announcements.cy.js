describe("Testing Announcements", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3003");
  });

  it("announcements are rendered", function () {
    cy.get("#announcements").as("anc").should("have.css", "height", "30px");
    cy.get("@anc").contains(/\w+/i);
    cy.get("@anc")
      .get("[data-testid='CloseIcon']")
      .as("close")
      .should("not.be.visible");
  });

  it("announcements can be closed", function () {
    cy.get("[data-testid='CloseIcon']").as("close").should("not.be.visible");
    cy.get("@close").click({ force: true });
    cy.get("#announcements").should("not.be.visible");
  });
});
