describe('Application loads successfully', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001')
    });

    it('should display the homepage', () => {
        cy.visit('/');
        cy.get('button').contains('Start Quiz').should('be.visible');
    })
})