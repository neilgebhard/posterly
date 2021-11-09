describe("renders the home page", () => {
  afterEach(() => {
    // preserve login credentials
    Cypress.Cookies.preserveOnce("token");
  });

  it("renders correctly", () => {
    cy.visit("/");
    cy.get("main").should("exist");
  });

  // signup

  // login
  it("allows login", () => {
    cy.visit("/");
    cy.get("#login-link").click();
    cy.get("#email").clear();
    cy.get("#email").type("neil@gmail.com");
    cy.get("#password").clear();
    cy.get("#password").type("default12");
    cy.get("#login-btn").click();
    cy.findByText("wile1234").should("exist");
  });

  // create a post
  it("make sure adding a post works", () => {
    cy.visit("/");
    cy.get("#create-post-link").click();
    cy.get("#title").clear();
    cy.get("#title").type("THIS IS A TEST COMMENT");
    cy.get("#create-post-btn").click();
    cy.findByText("THIS IS A TEST COMMENT").should("exist");
  });

  // delete a post
  // cy.get(":last-child #delete-btn").click();
  // delete post

  // delete user
});
