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

describe('Page /submissions', () => {
  it('affiche les données des submissions', () => {
    cy.visit('http://localhost:5000/submissions');

    // On s'attend à ce que la réponse soit une liste JSON,
    // donc on vérifie que le corps contient un tableau d'objets
    cy.request('/submissions').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      // Par exemple, on vérifie que chaque élément a bien un nom et un email
      if (response.body.length > 0) {
        expect(response.body[0]).to.have.property('name');
        expect(response.body[0]).to.have.property('email');
      }
    });

    // Pour vérifier l'affichage sur la page, il faut que la page rende le JSON,
    // sinon adapte selon ton front (ici on suppose que c'est affiché en JSON brut)
    cy.get('pre').then(($pre) => {
      const text = $pre.text();
      const data = JSON.parse(text);
      expect(data).to.be.an('array');
      if (data.length > 0) {
        expect(data[0]).to.have.property('name');
        expect(data[0]).to.have.property('email');
      }
    });
  });

  it('affiche au moins la submission ["Alice", "alice@example.com"]', () => {
    cy.visit('http://localhost:5000/submissions');

    // On vérifie que la page contient le nom "Alice"
    cy.contains('Alice').should('be.visible');

    // On vérifie que la page contient l'email "alice@example.com"
    cy.contains('alice@example.com').should('be.visible');
  });
});

