# RPA Challenge

Projeto de automação E2E com Cypress para o desafio RPA.

## Pré-requisitos

- Node.js instalado
- npm instalado

## Instalação

Na raiz do projeto, execute:

```bash
npm install
```

## Executar os testes

Para abrir a interface do Cypress:

```bash
npx cypress open
```

Para executar os testes em modo headless:

```bash
npx cypress run
```

Os testes E2E usam como URL base:

```text
https://www.rpachallenge.com
```

## Leitura da planilha XLSX

A planilha deve ficar dentro de `cypress/fixtures`. Atualmente, o arquivo padrão é:

```text
cypress/fixtures/challenge.xlsx
```

O comando customizado `cy.readXlsx()` lê a primeira aba da planilha e usa a primeira linha como cabeçalho.

### Ler todas as colunas

```js
cy.readXlsx().then((rows) => {
	cy.log(JSON.stringify(rows));
});
```

### Ler colunas específicas

```js
cy.readXlsx("challenge.xlsx", ["First Name", "Email"]).then((rows) => {
	rows.forEach((row) => {
		cy.log(`${row["First Name"]} - ${row.Email}`);
	});
});
```

O nome das colunas deve ser informado exatamente como aparece na primeira linha da planilha.

## Estrutura principal

```text
.
├── cypress/
│   ├── fixtures/
│   │   └── challenge.xlsx
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js
├── package.json
└── README.md
```