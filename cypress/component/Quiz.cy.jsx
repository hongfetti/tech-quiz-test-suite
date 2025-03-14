import React from 'react'
import Quiz from '../../client/src/components/Quiz'

describe('<Quiz />', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/questions/random', {
            fixture: 'questions.json'
        }).as('getQuestions')

        cy.mount(<Quiz />)
    });

  it('renders the start quiz button', () => {
    cy.contains('Start Quiz').should('be.visible');
  });

  it('starts the quiz and displays a question', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.get('h2').should('be.visible').and('not.be.empty');
  });
});