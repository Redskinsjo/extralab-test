beforeEach(() => {
  cy.visit("/");
});

describe("tests dom and page skeleton", () => {
  it("checks header and logo is present", () => {
    cy.get("[data-test=header]").should("exist");
    cy.get("[data-test=header] img").should("exist");
    cy.get("[data-test=header] img")
      .invoke("attr", "src")
      .should("eq", "/static/media/logo.3f1cc5c705257a66ddca.png");
  });

  it("checks menu navigation", () => {
    cy.get("[data-test=home-link]").contains("Home");
    cy.get("[data-test=favorites-link]").contains("Favourites");
  });

  it("checks actor card", () => {
    cy.get("[data-test=card] img").should("exist");
    cy.get("[data-test=card] img")
      .invoke("attr", "src")
      .should("match", /^https:\/\/cloudflare-ipfs.com/);

    cy.get("[data-test=start]").contains("Started");
    cy.get("[data-test=price]").contains("Price:");
  });

  it("checks hovering card then back visible", () => {
    cy.wait(2000);
    cy.get("[data-test=card]").eq(1).trigger("mouseover");
    cy.get("[data-test=card-back]").eq(1).should("be.visible");
    cy.get("[data-test=from]").should("be.visible");
    cy.get("[data-test=phone]").should("be.visible");
    cy.get("[data-test=email]").should("be.visible");
  });
});

describe("navigation", () => {
  it("navigate to favourites page", () => {
    cy.visit("/favorites");
    cy.url("/favorites");
  });

  it("check header and logo is present and that nothing is rendered", () => {
    cy.visit("/favorites");
    cy.get("[data-test=header]").should("exist");
    cy.get("[data-test=header] img").should("exist");
    cy.get("[data-test=header] img")
      .invoke("attr", "src")
      .should("eq", "/static/media/logo.3f1cc5c705257a66ddca.png");

    cy.get("span").contains("Sorry, nothing to render");
  });
});

describe("data", () => {
  it("checks data count", () => {
    cy.get("[data-test=card]").should("have.length", 100);
  });
});

describe("dynamic clicks", () => {
  it("checks adding card to favorites", () => {
    cy.get("[data-test=add-button]").eq(1).click({ force: true });
    cy.wait(1000);
    cy.visit("/favorites");
    cy.get("[data-test=card]").should("have.length", 1);
  });
});
