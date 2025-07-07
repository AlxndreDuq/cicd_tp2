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

describe('API /submissions', () => {
  it('retourne une liste avec des champs name et email', () => {
    cy.request('http://localhost:5000/submissions').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');

      if (response.body.length > 0) {
        const first = response.body[0];
        expect(first).to.have.property('name');
        expect(first).to.have.property('email');
      }
    });
  });

  it('contient au moins Alice', () => {
    cy.request('http://localhost:5000/submissions').then((response) => {
      const found = response.body.some((entry) =>
        entry.name === 'Alice' && entry.email === 'alice@example.com'
      );
      expect(found).to.be.true;
    });
  });
});
