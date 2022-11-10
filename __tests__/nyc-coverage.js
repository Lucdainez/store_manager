const fs = require('fs').promises;
const path = require('path');
const util = require('util');
const { exec: callbackExec } = require('child_process');
require('dotenv').config();

const exec = util.promisify(callbackExec);

const NPX_NYC_COMMAND =
  `npx nyc --all --include src/services --include src/models --include src/controllers --reporter json-summary mocha tests/unit/**/*.js --exit`;

const connectionRegex = /connection/
const modelRegex = /(\/|\\)models(\/|\\)/;
const serviceRegex = /(\/|\\)services(\/|\\)/;
const controllerRegex = /(\/|\\)controllers(\/|\\)/;

// Essa função lê o report gerado pelo nyc e devolve no formato de uma array.
function readCoverageFile() {
  const COVERAGE_FILE_PATH = path.join(__dirname, '..', 'coverage', 'coverage-summary.json');
  return fs.readFile(COVERAGE_FILE_PATH).then(JSON.parse);
};

// essa função sumariza a quantidade de linhas e funções totais e cobertas em uma array de coverage
function summaryCoveragePerFolder(arr) {
  const summary = arr.reduce((acc, cur) => {
    acc.total += cur[1].lines.total;
    acc.covered += cur[1].lines.covered;
    acc.totalFunctions += cur[1].functions.total;
    acc.totalCoveredFunctions += cur[1].functions.covered;
    return acc
  }, { total: 0, covered: 0, totalFunctions: 0, totalCoveredFunctions: 0 })
  return summary;
}

async function clearNycCoverage() {
  await exec('rm -rf coverage .nyc_output');
}

// essa função filtra a array completa retornada por readCoverageFile e retorna apenas os objetos de um diretório específico
// na camada de model, ele filtra para remover o arquivo connection.js desta array.
function filterPerFolder(arr, regex) {
  return arr.filter(([fileName]) => !connectionRegex.test(fileName) && regex.test(fileName))
}

// função usada para calcular o percentual de uma das camadas
function percentage(total, covered) {
  return (covered / total) * 100
}

// Essa função praticamente executa o nyc para criar o relatório de coverage que vai ser lido pela função `readCoverageFile`
const executeTests = async () => {
  try {
    await exec(NPX_NYC_COMMAND)
  } catch (error) {
    // Verifica se o erro é referente aos testes, escritos pela pessoa estudante, estarem falhando
    if (error.stdout.includes('failing')) {
      // Captura o número de testes falhando
      const [numberOfFailingTests] = error.stdout
        // Separa o texto em um array de strings
        .split('\n')
        // Procura a linha que contém a palavra 'failing'
        .find((line) => line.includes('failing'))
        // Remove espaços em branco
        .trim()
        // Separa a linha em um array de strings
        .split(' ');

      // Captura o log dos testes que falharam
      const failingTests = error.stdout.split('failing')[1].trim();

      console.log(`${numberOfFailingTests} test(s) failed\n\n${failingTests}`);

      throw 'Alguns dos seus testes falharam, esse requisito só será avaliado se todos os seus testes passarem. Execute o comando npm run test:mocha para validar seus testes.';
    }

    throw error;
  }
};

// checagem da porcentagem de cobertura de linhas e funções e quantidade mínima de funções por camada
function verifyCoverage(layer, coveragePercentage, minFunctionsQty) {
  expect(percentage(layer.total, layer.covered)).toBeGreaterThanOrEqual(coveragePercentage);
  expect(percentage(layer.totalFunctions, layer.totalCoveredFunctions)).toBeGreaterThanOrEqual(coveragePercentage);
  expect(layer.totalFunctions).toBeGreaterThanOrEqual(minFunctionsQty);
}

function assertCoveragePercentage(coverageResultsArr, coveragePercentage, minFunctionsQty) {
  const modelLayer = summaryCoveragePerFolder(filterPerFolder(coverageResultsArr, modelRegex))
  verifyCoverage(modelLayer, coveragePercentage, minFunctionsQty)

  const serviceLayer = summaryCoveragePerFolder(filterPerFolder(coverageResultsArr, serviceRegex));
  verifyCoverage(serviceLayer, coveragePercentage, minFunctionsQty)

  const controllerLayer = summaryCoveragePerFolder(filterPerFolder(coverageResultsArr, controllerRegex));
  verifyCoverage(controllerLayer, coveragePercentage, minFunctionsQty)
}

module.exports = {
  assertCoveragePercentage,
  clearNycCoverage,
  executeTests,
  readCoverageFile,
}
