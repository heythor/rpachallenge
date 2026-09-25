Cypress.Commands.add("readXlsx", (fileName = "challenge.xlsx", columns) => {
	return cy.task("readXlsx", { fileName, columns });
});
