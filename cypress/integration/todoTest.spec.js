/// <reference types="cypress" />

const itemInputCheckbox = '.task-listing .input--checkbox';
const taskListing = '.task-listing';
const inputCheckbox = '.input--checkbox';

describe('Test to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('check components loaded', () => {
    cy.contains('Toggle All').should('be.visible');
    cy.get('.App').find('.page-title').should('have.text', 'Todos App');
    cy.get('.App').find('.input-todo').should('be.visible');
    cy.get('.App').find('.btn---toggle-all').should('be.visible');
    cy.get(inputCheckbox).find('.remove-item').should('be.visible');
    cy.get('.block-filter').find('button').should('have.length', 3);
    cy.get('.block-filter').find('> span').should('have.text', 'Filters');
  })

  it('displays two todo items by default', () => {
    cy.get(itemInputCheckbox).should('have.length', 2)
    cy.get(taskListing).find(inputCheckbox).first().find('label').should('have.text', 'todo1')
    cy.get(taskListing).find(inputCheckbox).last().find('label').should('have.text', 'todo2')
  })

  it('can add new todo items', () => {
    const newItem = 'new added todo3'
    cy.get('.input-todo').type(`${newItem}{enter}`)
    cy.get(itemInputCheckbox).should('have.length', 3)
    cy.get(taskListing).find(inputCheckbox).last().find('label').should('have.text', newItem)
  })

  it('can click button toggle check all', () => {
    cy.contains('Toggle All').click()
    cy.get(itemInputCheckbox).should('have.length', 2)
    cy.get(itemInputCheckbox).find('[type="checkbox"]').should('be.checked')
    cy.contains('Toggle All').click()
    cy.get(itemInputCheckbox).should('have.length', 2)
    cy.get(itemInputCheckbox).find('[type="checkbox"]').should('be.not.checked')
  })

  it('can delete item', () => {
    cy.contains('x').first().click()
    cy.get(itemInputCheckbox).should('have.length', 1)
    cy.contains('x').first().click()
    cy.get(itemInputCheckbox).should('have.length', 0)
    cy.get('.App').find('.empty-data').should('have.text', 'no data')
  })

  it('can filter list', () => {
    cy.contains('DONE').click()
    cy.get(itemInputCheckbox).should('have.length', 1)
    cy.contains('ACTIVE').click()
    cy.get(itemInputCheckbox).should('have.length', 1)
    cy.contains('ALL').click()
    cy.get(itemInputCheckbox).should('have.length', 2)
  })
})
  