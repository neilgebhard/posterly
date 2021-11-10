const POST_TEXT = "THIS IS A TEST POST.";
const COMMENT_TEXT = "THIS IS A TEST COMMENT.";
const REPLY_TEXT = "THIS IS A TEST REPLY.";

describe("homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // Render homepage
  it("renders correctly", () => {
    cy.visit("/");
    cy.get("main").should("exist");
  });

  // Signup

  // Login
  // it("allows login", () => {
  //   cy.get("#login-link").click();
  //   cy.get("#email").clear().type("neil@gmail.com");
  //   cy.get("#password").clear().type("default12");
  //   cy.get("#login-btn").click();
  //   cy.contains("wile1234").should("exist");
  // });
});

describe("logged in capabilities", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#login-link").click();
    cy.get("#email").clear().type("neil@gmail.com");
    cy.get("#password").clear().type("default12");
    cy.get("#login-btn").click();
    cy.contains("wile1234").should("exist");
  });

  // Create a post
  it("can create a post", () => {
    cy.get("#create-post-link").click();
    cy.get("#title").clear().type(POST_TEXT);
    cy.get("#create-post-btn").click();
    cy.contains(POST_TEXT).should("exist");
  });

  // Create a comment
  it("can create a comment", () => {
    cy.contains(POST_TEXT).parent().find("#comment-link").click();
    cy.get("#comment-text").clear().type(COMMENT_TEXT);
    cy.get("#comment-text").parents("form").find("#submit-btn").click();
    cy.contains(COMMENT_TEXT).should("exist");
  });

  // Create a reply
  it("can create a reply", () => {
    cy.contains(POST_TEXT).parent().find("#comment-link").click();
    cy.contains(COMMENT_TEXT).parent().find("#reply-btn").click();
    cy.get("#reply-text").clear().type(REPLY_TEXT);
    cy.get("#reply-text").parents("form").find("#submit-btn").click();
    cy.contains(REPLY_TEXT).should("exist");
  });

  // Delete a reply
  it("can delete a reply", () => {
    cy.contains(POST_TEXT).parent().find("#comment-link").click();
    cy.contains(REPLY_TEXT).parent().find("#delete-btn").click();
    cy.contains(REPLY_TEXT).should("not.exist");
  });

  // Delete a comment
  it("can delete a comment", () => {
    cy.contains(POST_TEXT).parent().find("#comment-link").click();
    cy.contains(COMMENT_TEXT).parent().find("#delete-btn").click();
    cy.contains(COMMENT_TEXT).should("not.exist");
  });

  // Delete a post
  it("can delete a post", () => {
    cy.contains(POST_TEXT).parent().find("#delete-btn").click();
    cy.contains(POST_TEXT).should("not.exist");
  });

  // Delete user
});
