describe('Testes do Formulário ToolsQA', () => {
  
    beforeEach(() => {
      cy.visit('https://www.toolsqa.com/selenium-training/#enroll-form');
      cy.wait(5000);
    });
  
    it('Deve preencher o formulário e enviar com sucesso', () => {
      cy.get('#enroll-form', { timeout: 30000 }).should('be.visible'); 
      cy.get('#enroll-name').should('be.visible');  // Aguarda o elemento se tornar visível
      cy.get('#enroll-name').type('Gabriela Onofre');  // Preenche o campo após verificar que está visível
      
      cy.get('#enroll-email').type('gabrielaonofre@gmail.com');
      cy.get('#enroll-phone').type('987654321');
      cy.get('#enroll-country').select('Brazil');
      cy.get('#enroll-submit').click();
      
      cy.get('.enroll-message', { timeout: 10000 }).should('contain', 'You have successfully enrolled!');
    });


  it('Deve verificar a presença de elementos obrigatórios na página', () => {
    // Verificando a presença de elementos obrigatórios
    cy.get('h2').should('contain', 'Selenium WebDriver Training');  // Título
    cy.get('#enroll-form').should('be.visible');  // Formulário
    cy.get('#enroll-submit').should('be.visible');  // Botão de envio
    
    // Verificando a visibilidade do campo nome
    cy.get('#enroll-name').should('be.visible');
    // Verificando a visibilidade do campo email
    cy.get('#enroll-email').should('be.visible');
  });

  it('Deve validar que campos obrigatórios não podem ser deixados em branco', () => {
    // Submetendo o formulário com campos obrigatórios em branco
    cy.get('#enroll-submit').click();
    
    // Validando a mensagem de erro para o campo "Nome"
    cy.get('#enroll-name').then(($input) => {
      if ($input.val() === '') {
        cy.get('.error-message').should('contain', 'Name is required');
      }
    });

    // Validando a mensagem de erro para o campo "Email"
    cy.get('#enroll-email').then(($input) => {
      if ($input.val() === '') {
        cy.get('.error-message').should('contain', 'Email is required');
      }
    });
  });

  it('Deve testar a funcionalidade do botão de envio, verificando a resposta após o envio', () => {
    const validEmail = 'test.email@dominio.com';
    const validPhone = '123456789';

    // Preenchendo o formulário com dados válidos
    cy.get('#enroll-name').type('Ana Costa');
    cy.get('#enroll-email').type(validEmail);
    cy.get('#enroll-phone').type(validPhone);
    cy.get('#enroll-country').select('United States');

    cy.intercept('POST', '/api/submit-enrollment', {
      statusCode: 200,
      body: {
        status: 'success',
        email: validEmail,
        phone: validPhone
      }
    }).as('formSubmit');

    // Submetendo o formulário
    cy.get('#enroll-submit').click();

    cy.wait('@formSubmit').its('response.statusCode').should('eq', 200);

    // Verificando se a mensagem de sucesso foi exibida
    cy.get('.enroll-message').should('contain', 'You have successfully enrolled!');
  });
});

