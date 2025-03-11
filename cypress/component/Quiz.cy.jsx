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

    cy.fixture('questions.json').then((questions) => {
        const randomQuestion = questions[Math.floor(Math.random()*questions.length)]

        cy.get('h2').should('be.visible').and('contain', randomQuestion.question);
    });
  });
});