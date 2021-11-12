import randomstring from "randomstring";

const POST_TEXT = randomstring.generate(12);
const COMMENT_TEXT = randomstring.generate(12);
const REPLY_TEXT = randomstring.generate(12);

const username = randomstring.generate(12);
const email = `${randomstring.generate(6)}@${randomstring.generate(6)}.com`;
const password = randomstring.generate(12);

let usernameItem;
let emailItem;

// Homepage
describe("homepage", () => {
  it("renders correctly", () => {
    cy.visit("/");
    cy.get("main").should("exist");
  });
});

// Signup
describe("signup", () => {
  it("can signup", () => {
    cy.visit("/");
    cy.get("#signup-link").click();
    cy.get("#username").clear().type(username);
    cy.get("#email").clear().type(email);
    cy.get("#password").clear().type(password);
    cy.get("#signup-btn")
      .click()
      .should(() => {
        expect(localStorage.getItem("email")).to.eq(email);
        expect(localStorage.getItem("username")).to.eq(username);
      });
    cy.contains(username).should("exist");
    cy.getCookie("token").should("exist");
  });

  it("can go to profile", () => {
    cy.get("#profile-menu").click();
    cy.contains("Your Profile").click();
    cy.contains(username).should("exist");
    cy.contains(email).should("exist");
    cy.contains("Home").click();
  });

  // Logout
  it("can logout", () => {
    cy.get("#profile-menu").click();
    cy.contains("Log out")
      .click()
      .should(() => {
        expect(localStorage.getItem("email")).to.be.null;
        expect(localStorage.getItem("username")).to.be.null;
      });
    cy.getCookie("token").should("be.null");
  });
});

describe("logged in capabilities", () => {
  beforeEach(() => {
    cy.visit("/");

    if (usernameItem) localStorage.setItem("username", usernameItem);
    if (emailItem) localStorage.setItem("email", emailItem);
  });

  afterEach(() => {
    Cypress.Cookies.preserveOnce("token");

    usernameItem = localStorage.getItem("username");
    emailItem = localStorage.getItem("email");
  });

  it("can login", () => {
    cy.get("#login-link").click();
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("#login-btn")
      .click()
      .should(() => {
        expect(localStorage.getItem("email")).to.exist;
        expect(localStorage.getItem("username")).to.exist;
      });
    cy.contains(username).should("exist");
    cy.getCookie("token").should("exist");
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
