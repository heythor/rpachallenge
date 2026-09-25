describe('template spec', () => {

  beforeEach(() => {
    cy.visit('/');
  })

  it('submit 10 times', () => {


    cy.get('button').contains('Start').click();

    cy.readXlsx().then((rows) => {
    const firtName = rows.map((row) => row["First Name"]);
    const lastName = rows.map((row) => row["Last Name "]);
    const company = rows.map((row) => row["Company Name"]);
    const phoneNumber = rows.map((row) => row["Phone Number"]);
    const email = rows.map((row) => row["Email"]);
    const address = rows.map((row) => row["Address"]);
    const role = rows.map((row) => row["Role in Company"]);

    firtName.forEach((firstName, index) => {

      cy.contains('First Name').parent().find('input').type(firstName);
      cy.contains('Last Name').parent().find('input').type(lastName[index]);
      cy.contains('Company Name').parent().find('input').type(company[index]);
      cy.contains('Phone Number').parent().find('input').type(phoneNumber[index]);
      cy.contains('Email').parent().find('input').type(email[index]);
      cy.contains('Address').parent().find('input').type(address[index]);
      cy.contains('Role in Company').parent().find('input').type(role[index]);

      cy.contains('Submit').click();
      
    });
    });

    cy.contains('Congratulations!').should('be.visible');
  });
});