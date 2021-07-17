/// <reference types="cypress" />

const itemInputCheckbox = ".task-listing .input--checkbox";
const taskListing = ".task-listing";
const inputCheckbox = ".input--checkbox";
const newItem = "test todo";

describe("Test to-do app", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
        cy.get(".input-todo").type(`${newItem}{enter}`);
        cy.wait(2000);
    });

    afterEach(() => {
        cy.wait(2000);
    });

    it("check components loaded", () => {
        cy.get(".App").find(".page-title").should("have.text", "Todos App");
        cy.get(".App").find(".input-todo").should("be.visible");
        cy.get(".block-filter").find("button").should("have.length", 3);
        cy.get(".block-filter").find("> span").should("have.text", "Filters");
        cy.get(".remove-item").click();
    });

    it("should add new todo items", () => {
        cy.get(inputCheckbox).find(".remove-item").should("be.visible");
        cy.get(".App").find(".btn---toggle-all").should("be.visible");
        cy.get(itemInputCheckbox).should("have.length", 1);
        cy.get(taskListing).find(inputCheckbox).find("label").should("have.text", newItem);
        cy.get(".remove-item").click();
    });

    it("should delete item", () => {
        cy.get(itemInputCheckbox).should("have.length", 1);
        cy.get(".remove-item").click();
        cy.wait(2000);
        cy.get(".App").find(".empty-data").should("have.text", "no data");
    });

    it("should click checkbox", () => {
        cy.get(itemInputCheckbox).find('[type="checkbox"]').click();
        cy.wait(2000);
        cy.get(itemInputCheckbox).find('[type="checkbox"]').should("be.checked");
        cy.get(itemInputCheckbox).find('[type="checkbox"]').click();
        cy.wait(2000);
        cy.get(itemInputCheckbox).find('[type="checkbox"]').should("be.not.checked");
        cy.get(".remove-item").click();
    });

    it("should click button toggle check all", () => {
        cy.get(".input-todo").type(`${newItem}{enter}`);
        cy.wait(2000);
        cy.contains("Toggle All").click();
        cy.wait(2000);
        cy.get(itemInputCheckbox).should("have.length", 2);
        cy.get(itemInputCheckbox).find('[type="checkbox"]').should("be.checked");
        cy.contains("Toggle All").click();
        cy.wait(2000);
        cy.get(itemInputCheckbox).should("have.length", 2);
        cy.get(itemInputCheckbox).find('[type="checkbox"]').should("be.not.checked");
        cy.get(".remove-item").first().click();
        cy.get(".remove-item").last().click();
    });

    it("should select filter", () => {
        cy.get(".input-todo").type(`${newItem}{enter}`);
        cy.wait(2000);
        cy.get(itemInputCheckbox).find('[type="checkbox"]').first().click();
        cy.wait(2000);
        cy.contains("DONE").click();
        cy.get(itemInputCheckbox).should("have.length", 1);
        cy.contains("ACTIVE").click();
        cy.get(itemInputCheckbox).should("have.length", 1);
        cy.contains("ALL").click();
        cy.get(itemInputCheckbox).should("have.length", 2);
        cy.get(".remove-item").first().click();
        cy.get(".remove-item").last().click();
    });
});
