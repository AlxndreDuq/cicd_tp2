describe('Formulaire de soumission', () => {
  const url = 'http://localhost:5000/';

  it('soumet le formulaire avec succès', () => {
    cy.visit(url);

    cy.get('input[name="name"]').type('Jean Dupont');
    cy.get('input[name="email"]').type('jean@example.com');
    cy.get('button[type="submit"]').click();

    // Vérifie que la réponse contient un message de succès
    cy.contains('Form submitted successfully');
  });

  it('rejette une soumission invalide (email manquant)', () => {
    cy.visit(url);

    cy.get('input[name="name"]').type('Jean');
    cy.get('input[name="email"]').type('email-invalide');
    cy.get('button[type="submit"]').click();

    // Vérifie que le serveur a bien renvoyé une erreur
    cy.on('window:alert', (str) => {
      expect(str).to.contain('Invalid input');
    });
  });
});
