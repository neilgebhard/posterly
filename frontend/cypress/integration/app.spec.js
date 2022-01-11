import randomstring from "randomstring";

const postText = randomstring.generate(12);
const commentText = randomstring.generate(12);
const replyText = randomstring.generate(12);

const username = randomstring.generate(12);
const email = `${randomstring.generate(6)}@${randomstring.generate(6)}.com`;
const password = randomstring.generate(12);

let usernameItem;
let emailItem;

describe("homepage", () => {
  it("renders correctly", () => {
    cy.visit("/");
    cy.get("main").should("exist");
  });
});

describe("signup", () => {
  it("can signup", () => {
    cy.visit("/");
    cy.get("[data-testid=signup-link]").click();
    cy.get("[data-testid=username]").type(username);
    cy.get("[data-testid=email]").type(email);
    cy.get("[data-testid=password]").type(password);
    cy.get("[data-testid=signup-btn]")
      .click()
      .should(() => {
        expect(localStorage.getItem("email")).to.eq(email);
        expect(localStorage.getItem("username")).to.eq(username);
      });
    cy.contains(username).should("exist");
    cy.getCookie("token").should("exist");
  });

  it("can go to profile", () => {
    cy.get("[data-testid=profile-menu]").click();
    cy.get("[data-testid=profile-link]").click();
    cy.contains(username).should("exist");
    cy.contains(email).should("exist");
    cy.get("[data-testid=home-link]").click();
  });

  it("can logout", () => {
    cy.get("[data-testid=profile-menu]").click();
    cy.get("[data-testid=logout-link")
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
    cy.get("[data-testid=login-link]").click();
    cy.get("[data-testid=email]").type(email);
    cy.get("[data-testid=password]").type(password);
    cy.get("[data-testid=login-btn]")
      .click()
      .should(() => {
        expect(localStorage.getItem("email")).to.exist;
        expect(localStorage.getItem("username")).to.exist;
      });
    cy.contains(username).should("exist");
    cy.getCookie("token").should("exist");
  });

  it("can create a post", () => {
    cy.get("[data-testid=create-post-link]").click();
    cy.get("[data-testid=title]").type(postText);
    cy.get("[data-testid=create-post-btn]").click();
    cy.contains(postText).should("exist");
  });

  it("can create a comment", () => {
    cy.contains(postText)
      .parents("li")
      .find("[data-testid=comments-link]")
      .click();
    cy.get("[data-testid=comment-text]").type(commentText);
    cy.get("[data-testid=comment-text]")
      .parents("form")
      .find("[data-testid=submit-comment]")
      .click();
    cy.contains(commentText).should("exist");
  });

  it("can create a reply", () => {
    cy.contains(postText)
      .parents("li")
      .find("[data-testid=comments-link]")
      .click();
    cy.contains(commentText)
      .parents("li")
      .find("[data-testid=reply-btn]")
      .click();
    cy.get("[data-testid=reply-text]").type(replyText);
    cy.get("[data-testid=reply-text]")
      .parents("form")
      .find("[data-testid=submit-reply]")
      .click();
    cy.contains(replyText).should("exist");
  });

  it("can delete a reply", () => {
    cy.contains(postText)
      .parents("li")
      .find("[data-testid=comments-link]")
      .click();
    cy.contains(replyText)
      .parents("li")
      .find("[data-testid=delete-reply]")
      .click();
    cy.contains(replyText).should("not.exist");
  });

  it("can delete a comment", () => {
    cy.contains(postText)
      .parents("li")
      .find("[data-testid=comments-link]")
      .click();
    cy.contains(commentText)
      .parents("li")
      .find("[data-testid=delete-comment]")
      .click();
    cy.contains(commentText).should("not.exist");
  });

  it("can delete a post", () => {
    cy.contains(postText)
      .parents("li")
      .find("[data-testid=delete-post]")
      .click();
    cy.contains(postText).should("not.exist");
  });
});
