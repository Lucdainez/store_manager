const { executeTests, readCoverageFile, assertCoveragePercentage, clearNycCoverage } = require('./nyc-coverage');


describe('Testes das camadas Model, Service e Controller', () => {
  let coverageResults;
  let coverageResultsArr;

  beforeAll(async () => {
    await executeTests();
    coverageResults = await readCoverageFile();
    coverageResultsArr = Object.entries(coverageResults);
  })

  afterAll(async (done) => {
    await clearNycCoverage();
    done()
  });

  describe('02 - Desenvolva testes que cubram no mínimo 5% das camadas da sua aplicação', () => {

    it('Será validado que cobertura total das linhas dos arquivos nas pastas `models`, `services` e `controllers` é maior ou igual a 5%', async () => {
      assertCoveragePercentage(coverageResultsArr, 5, 2);
    });
  });

  describe('05 - Desenvolva testes que cubram no mínimo 10% das camadas da sua aplicação', () => {
    it('Será validado que cobertura total das linhas dos arquivos nas pastas `models`, `services` e `controllers` é maior ou igual a 10%', async () => {
      assertCoveragePercentage(coverageResultsArr, 10, 3);
    });
  });

  describe('07 - Desenvolva testes que cubram no mínimo 15% das camadas da sua aplicação', () => {

    it('Será validado que cobertura total das linhas dos arquivos nas pastas `models`, `services` e `controllers` é maior ou igual a 15%', async () => {
      assertCoveragePercentage(coverageResultsArr, 15, 4);
      
    });
  });

  describe('09 - Desenvolva testes que cubram no mínimo 20% das camadas da sua aplicação', () => {
    it('Será validado que cobertura total das linhas dos arquivos nas pastas `models`, `services` e `controllers` é maior ou igual a 20%', async () => {
      assertCoveragePercentage(coverageResultsArr, 20, 6);
    });
  });

  describe('11 - Desenvolva testes que cubram no mínimo 25% das camadas da sua aplicação', () => {

    it('Será validado que cobertura total das linhas dos arquivos nas pastas `models`, `services` e `controllers` é maior ou igual a 25%', async () => {
      assertCoveragePercentage(coverageResultsArr, 25, 7);
    });
  });

  describe('13 - Desenvolva testes que cubram no mínimo 30% das camadas da sua aplicação', () => {

    it('Será validado que cobertura total das linhas dos arquivos nas pastas `models`, `services` e `controllers` é maior ou igual a 30%', async () => {
      assertCoveragePercentage(coverageResultsArr, 30, 8);
      
    });
  });

  describe('15 - Desenvolva testes que cubram no mínimo 35% das camadas da sua aplicação', () => {
    it('Será validado que cobertura total das linhas dos arquivos nas pastas `models`, `services` e `controllers` é maior ou igual a 35%', async () => {
      assertCoveragePercentage(coverageResultsArr, 35, 9);
    });
  });

  describe('17 - Desenvolva testes que cubram no mínimo 40% das camadas da sua aplicação', () => {
    it('Será validado que cobertura total das linhas dos arquivos nas pastas `models`, `services` e `controllers` é maior ou igual a 40%', async () => {
      assertCoveragePercentage(coverageResultsArr, 40, 10);
    });
  });

  describe('19 - Desenvolva testes que cubram no mínimo 50% das camadas da sua aplicação', () => {
    it('Será validado que cobertura total das linhas dos arquivos nas pastas `models`, `services` e `controllers` é maior ou igual a 50%', async () => {
      assertCoveragePercentage(coverageResultsArr, 50, 11);
    });
  });

  describe('20 - Desenvolva testes que cubram no mínimo 60% das camadas da sua aplicação', () => {
    it('Será validado que cobertura total das linhas dos arquivos nas pastas `models`, `services` e `controllers` é maior ou igual a 60%', async () => {
      assertCoveragePercentage(coverageResultsArr, 60, 11);
    });
  });
})
