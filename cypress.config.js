const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.rpachallenge.com",
    setupNodeEvents(on, config) {
      on("task", {
        readXlsx({ fileName = "challenge.xlsx", columns } = {}) {
          const fixturesPath = path.resolve(config.projectRoot, "cypress", "fixtures");
          const filePath = path.resolve(fixturesPath, fileName);

          if (!filePath.startsWith(`${fixturesPath}${path.sep}`)) {
            throw new Error("O arquivo XLSX deve estar dentro de cypress/fixtures.");
          }

          if (!fs.existsSync(filePath)) {
            throw new Error(`Arquivo XLSX não encontrado: ${fileName}`);
          }

          const workbook = XLSX.readFile(filePath);
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const rows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

          if (!columns) {
            return rows;
          }

          return rows.map((row) =>
            columns.reduce((selectedColumns, column) => {
              selectedColumns[column] = row[column];
              return selectedColumns;
            }, {})
          );
        },
      });

      return config;
    },
  },
});
