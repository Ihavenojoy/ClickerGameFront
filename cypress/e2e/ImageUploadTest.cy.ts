describe('User Image Upload and Load (mocked backend)', () => {
    beforeEach(() => {
        // Use wildcard pattern to catch exact URL even if it differs slightly
        cy.intercept('POST', '**/userupload', {
            statusCode: 200,
            body: { success: true, imageUrl: 'http://fake-url.com/image.png' }
        }).as('uploadImage');

        cy.visit('/uploadImage'); // make sure this route matches your app
    });

    it('uploads and loads an image with mocked backend', () => {
        const fileName = 'test-image.png';

        cy.get('input[placeholder="Filename"]').clear().type('Test');

        // Select file first
        cy.fixture(fileName, 'base64').then((base64String: string) => {
            const blob = Cypress.Blob.base64StringToBlob(base64String, 'image/png');

            cy.get('input[type="file"]').selectFile({
                contents: blob,
                fileName,
                lastModified: Date.now(),
            }, { force: true });
        });

        // Click upload **after** file select finishes
        cy.contains('Upload').click();

        // Wait for the intercepted request with a longer timeout
        cy.wait('@uploadImage', { timeout: 10000 }).then(() => {
            cy.log('Upload request intercepted');
        });

        // Click Load Image after upload completes
        cy.contains('Load Image').click();

    });
});
