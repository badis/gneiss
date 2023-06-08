describe("Navigation", () => {
  it("should navigate to about page", () => {
    cy.visit("/about", { failOnStatusCode: false });

    // The url should include "/about"
    cy.url().should("include", "/about");

    // The new page should contain an h1 with "About page"
    cy.get("h1").contains("About Page");
  });
});

export {};
