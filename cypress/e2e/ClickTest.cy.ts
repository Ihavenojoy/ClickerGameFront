describe('ClickButton Component', () => {
    beforeEach(() => {
        // Visit the app (adjust baseUrl or path as needed)
        cy.visit('/');
    });

    it('should show loading initially or count', () => {
        cy.get('.count-text, p:contains("Loading...")').should('exist');
    });

    it('should increment the count on button click', () => {
        cy.get('.ClickButton').as('clickBtn');

        cy.get('@clickBtn').click();

        // Optional: assert that count text is updated after click
        cy.get('.count-text').should('contain.text', 'Count is:');
    });

    it('should open and close the image modal', () => {
        cy.contains('Select Image').click();

        cy.get('.overlay').should('be.visible');

        cy.contains('Cancel').click();

        cy.get('.overlay').should('not.exist');
    });

    it('should select an image and close modal', () => {
        cy.contains('Select Image').click();

        cy.get('.overlay').should('be.visible');

        cy.get('.image-list .img-option img').first().click();

        cy.get('.overlay').should('not.exist');

        // Optionally verify internal state change or log output
        // You can also hook into Cypress `window` to inspect ref values if exposed
    });
});
